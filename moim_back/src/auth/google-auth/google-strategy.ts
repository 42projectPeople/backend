import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { ConfigService } from '@nestjs/config'
@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  'google-strategy'
) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/redirect/google',
      scope: ['email'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any
  ): Promise<any> {
    const { emails } = profile
    return {
      email: emails[0].value,
      accessToken: accessToken, // 이게 필요할까?
    }
  }
}
