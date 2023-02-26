import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  Response,
  Request,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleSignUpGuard, GoogleLoginGuard } from './google-auth/google.guard'
import { JWTAuthGuard } from './jwt-auth/jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('logout')
  @UseGuards(JWTAuthGuard)
  async logout() {} // clear cookie

  /*****************************
   * Authentication via Google *
   *****************************/
  @Get('signup/google')
  @UseGuards(GoogleSignUpGuard)
  async signupGoogle() {}

  @Get('redirect/google-signup')
  @UseGuards(GoogleSignUpGuard)
  async redirectGoogleSignup(@Req() request: any) {
    return await this.authService.signup(request.user)
  }

  @Get('login/google')
  @UseGuards(GoogleLoginGuard)
  async loginGoogle() {}

  @Get('redirect/google-login')
  @UseGuards(GoogleLoginGuard)
  async redirectGoogleLogin(@Req() request: any, @Res() response: Response) {
    const userEmail: string = request.user?.email[0]
    return await this.authService.login(userEmail, response)
  }
}
