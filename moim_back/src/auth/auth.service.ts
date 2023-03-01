import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entity/User.entity'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { TokenSession } from '../entity/TokenSession.entity'

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

  private getRefreshToken(userId: number): string {
    return this.jwtService.sign(
      { userId: userId },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRE'),
      }
    )
  }

  private getNewAccessToken(userId: number): string {
    return this.jwtService.sign(
      { userId: userId },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRE'),
      }
    )
  }

  private getAccessTokenFromRequest(request: Request): string {
    const authHeader = request.header('Authorization')
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
    const days = this.configService.get('EXP_ROTATION_THRESHOLD') // days = n days
    const refreshTokenExpirationThreshold: number = days * 24 * 60 * 60
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
    const googleUser: any = request.user
    return googleUser.email[0]
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
  async login(
    request: Request,
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // find matched email from User table
    const user: User = await this.getUserFromGoogleUser(request)
    const userId: number = user.userId
    const accessToken: string = this.getNewAccessToken(userId)

    await this.deleteSession(userId)
    await this.createSession(userId, accessToken, refreshToken)
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  }

  async signup(request: Request): Promise<void> {
    const userName: string = this.getUserEmailFromGoogleUser(request)
    if (userName === undefined || userName === null) {
      throw new BadRequestException('bad google login')
    }
    const user: User = await this.userRepository.findOne({
      where: {
        userName: userName,
      },
    })
    if (user === undefined || user === null) {
      await this.userRepository.save({ userName: userName })
    } else {
      throw new BadRequestException('already exists')
    }
  }

  async logout(request: Request): Promise<void> {
    const token: string = this.getAccessTokenFromRequest(request)
    const { userId } = this.jwtService.decode(token) as any
    await this.deleteSession(userId)
  }

  async rotateTokens(
    request: Request,
    body: any
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken: string = this.getAccessTokenFromRequest(request)
    const refreshToken: string = body.refreshToken
    let userId: number
    let exp: number
    // check token is valid
    try {
      const accessTokenPayload = this.jwtService.verify(accessToken, {
        ignoreExpiration: true,
      })
      const refreshTokenPayload = this.jwtService.verify(refreshToken)
      userId = accessTokenPayload.userId
      exp = refreshTokenPayload.exp
      await this.checkValidTokenInSession(userId, accessToken, refreshToken)
    } catch (err) {
      throw new UnauthorizedException('invalid token')
    }
    // set new token
    const newAccessToken: string = this.getNewAccessToken(userId)
    const newRefreshToken: string = this.rotateToken(refreshToken, exp, userId)
    // update session and send it
    await this.updateSession(userId, newAccessToken, newRefreshToken)
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }
  }
}
