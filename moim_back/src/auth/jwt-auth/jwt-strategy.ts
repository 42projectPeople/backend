import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

/**
 * FtAuthStrategy uses 42 api to authenticate
 * this FtAuthStrategy is use for login/sign-in only
 */
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // set Strategy
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate(payload: any) {
    return { userId: payload.user_id }
  }
}
