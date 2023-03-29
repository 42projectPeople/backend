import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entity/User.entity'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { TokenSession } from '../entity/TokenSession.entity'
import { Response } from 'express'
import { TokenDto } from './dto/tokenDto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TokenSession, 'session')
    private readonly tokenSessionRepository: Repository<TokenSession>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  private dayToSeconds(days: number): number {
    return days * 24 * 3600
  }

  private getRefreshToken(userId: number): string {
    return this.jwtService.sign(
      { userId: userId },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.dayToSeconds(
          this.configService.get('JWT_REFRESH_EXPIRE')
        ),
      }
    )
  }

  private getNewAccessToken(userId: number): string {
    return this.jwtService.sign(
      { userId: userId },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.dayToSeconds(
          this.configService.get('JWT_ACCESS_EXPIRE')
        ),
      }
    )
  }

  private getAccessTokenFromRequest(request: Request): string {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null || token === undefined) {
      throw new UnauthorizedException('no token')
    }
    return token
  }

  private async checkValidTokenInSession(
    userId: number,
    accessToken: string,
    refreshToken: string
  ): Promise<void> {
    const session: TokenSession = await this.tokenSessionRepository.findOne({
      where: { userId: userId },
    })
    if (
      session.accessToken !== accessToken ||
      session.refreshToken !== refreshToken
    ) {
      throw new UnauthorizedException('invalid token in session')
    }
  }

  private rotateToken(
    refreshToken: string,
    exp: number,
    userId: number
  ): string {
    const now: number = Date.now().valueOf() / 1000
    const refreshTokenExpirationThreshold: number = this.dayToSeconds(
      this.configService.get('EXP_ROTATION_THRESHOLD')
    )
    const expiration: number = exp - now

    if (expiration > refreshTokenExpirationThreshold) {
      return refreshToken
    } else {
      return this.getRefreshToken(userId)
    }
  }

  private async updateSession(
    userId: number,
    accessToken: string,
    refreshToken: string
  ): Promise<void> {
    await this.tokenSessionRepository.update(
      { userId: userId },
      { accessToken: accessToken, refreshToken: refreshToken }
    )
  }

  private async createSession(
    userId: number,
    accessToken: string,
    refreshToken: string
  ): Promise<void> {
    await this.tokenSessionRepository.insert({
      userId: userId,
      accessToken: accessToken,
      refreshToken: refreshToken,
    })
  }

  private async deleteSession(userId: number): Promise<void> {
    await this.tokenSessionRepository.delete({
      userId: userId,
    })
  }

  private getUserEmailFromGoogleUser(request: Request): string {
    const { user } = request as any // 기존 Request 구조에 email 이 없어서 any 로 받아야합니다.
    return user.email
  }

  private async getUserFromGoogleUser(request: Request): Promise<User> {
    const userName = this.getUserEmailFromGoogleUser(request)
    const userFound: User = await this.userRepository.findOne({
      where: {
        userName: userName,
      },
    })
    if (userFound === undefined || userFound === null) {
      throw new UnauthorizedException('invalid token')
    }
    return userFound
  }

  // ******************
  // * Public Methods *
  // ******************

  /**
   * 별도의 회원가입 기능은 없고, 로그인을 하면 구글 로그인을 우선 한 뒤,
   * 회원이 아닐 경우 내부적으로 회원가입 절차로 넘깁니다.
   */
  async login(request: Request, response: Response): Promise<TokenDto> {
    let user: User = await this.getUserFromGoogleUser(request)
    // 회원가입 필요하면 회원가입으로 넘김
    if (user === undefined || user === null) {
      user = await this.signup(request, response)
    }
    const userId: number = user.userId
    const accessToken: string = this.getNewAccessToken(userId)
    const refreshToken: string = this.getRefreshToken(userId)

    await this.deleteSession(userId)
    await this.createSession(userId, accessToken, refreshToken)
    return {
      userId: userId,
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  }

  /**
   * Login 버튼을 누르고 구글 유저 로그인을 했으나, 유저가 없는 경우(회원가입을 해야하는 경우) 해당 Method 들어와서 user 얻습니다.
   * client 에서는 status code 만으로 추가 정보 페이지로 redirect 할지 아닐지에 대해서 결정합니다.
   */
  async signup(request: Request, response: Response): Promise<User> {
    const userName: string = this.getUserEmailFromGoogleUser(request)
    if (userName === undefined || userName === null) {
      throw new BadRequestException('bad google login')
    }
    let user: User = await this.userRepository.findOne({
      where: {
        userName: userName,
      },
    })
    if (user === undefined || user === null) {
      user = await this.userRepository.save({ userName: userName })
      response.status(HttpStatus.CREATED)
      return user
    } else {
      throw new BadRequestException('already exists') // 정상적인 경우에는 발생할 수가 없습니다.
    }
  }

  async logout(request: Request): Promise<void> {
    const token: string = this.getAccessTokenFromRequest(request)
    const { userId } = this.jwtService.decode(token) as any
    await this.deleteSession(userId)
  }

  async rotateTokens(request, body: any): Promise<TokenDto> {
    const accessToken: string = this.getAccessTokenFromRequest(request)
    const refreshToken: string = body.refreshToken
    let userId: number
    let exp: number
    // check token is valid
    try {
      const accessTokenPayload = this.jwtService.verify(accessToken, {
        ignoreExpiration: true,
        secret: this.configService.get('JWT_SECRET'),
      })
      const refreshTokenPayload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_SECRET'),
      })
      userId = accessTokenPayload.userId
      exp = refreshTokenPayload.exp
    } catch (err) {
      throw new UnauthorizedException('token verify failed')
    }
    await this.checkValidTokenInSession(userId, accessToken, refreshToken)
    // set new token
    const newAccessToken: string = this.getNewAccessToken(userId)
    const newRefreshToken: string = this.rotateToken(refreshToken, exp, userId)
    // update session and send it
    await this.updateSession(userId, newAccessToken, newRefreshToken)
    return {
      userId: userId,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }
  }
}
