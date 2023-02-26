import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleGuard } from './google-auth/google.guard'
import { JwtAuthGuardGuard } from './jwt-auth/jwt-auth.guard'
import { Request } from 'supertest'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('logout')
  @UseGuards(JwtAuthGuardGuard)
  async logout() {}

  /*****************************
   * Authentication via Google *
   *****************************/
  @Get('signup/google')
  @UseGuards(GoogleGuard)
  async signupGoogle() {} // it will  be redirected to redirect/google

  @Get('login/google')
  @UseGuards(GoogleGuard)
  async loginGoogle(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    // return await this.authService.logIn(request.user, response)
  }

  @Get('redirect/google')
  @UseGuards(GoogleGuard)
  async redirectGoogle(@Req() request: Request) {
    // return await this.authService.signUp(request.user)
  }
}
