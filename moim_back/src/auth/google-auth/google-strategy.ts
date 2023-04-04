import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-oauth20'
import { ConfigService } from '@nestjs/config'
// @Injectable()
// export class GoogleSignupStrategy extends PassportStrategy(
//   Strategy,
//   'google-signup-strategy'
// ) {
//   constructor(private readonly configService: ConfigService) {
//     super({
//       clientID: configService.get('GOOGLE_CLIENT_ID'),
//       clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
//       callbackURL: 'http://localhost:3000/auth/redirect/google-signup',
//       scope: ['email'],
//     })
//   }
//
//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any
//   ): Promise<any> {
//     const { emails } = profile
//     return {
//       email: emails[0].value,
//     }
//   }
// }
@Injectable()
export class GoogleLoginStrategy extends PassportStrategy(
  Strategy,
  'google-login-strategy'
) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
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
    }
  }
}
