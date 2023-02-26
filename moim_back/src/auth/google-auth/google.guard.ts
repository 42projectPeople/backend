import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GoogleLoginGuard extends AuthGuard('google-login-strategy') {}
@Injectable()
export class GoogleSignUpGuard extends AuthGuard('google-signup-strategy') {}
