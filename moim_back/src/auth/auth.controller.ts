import { Body, Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { Response, Request } from 'express'
import { AuthService } from './auth.service'
import { GoogleSignUpGuard, GoogleLoginGuard } from './google-auth/google.guard'
import { JWTAuthGuard } from './jwt-auth/jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('logout')
  @UseGuards(JWTAuthGuard)
  async logout(@Req() request: Request) {
    await this.authService.logout(request)
  } // clear cookie

  /*****************************
   * Authentication via Google *
   *****************************/
  @Get('/signup/google')
  @UseGuards(GoogleSignUpGuard)
  async signupGoogle() {
    return null // in Guard, it will be redirected. so, never happens
  }

  @Get('/redirect/google-signup')
  @UseGuards(GoogleSignUpGuard)
  async redirectGoogleSignup(@Req() request: Request) {
    // console.log(typeof request.user)
    return await this.authService.signup((request.user as any)?.email[0]) // check needed
  }

  @Get('/login/google')
  @UseGuards(GoogleLoginGuard)
  async loginGoogle() {
    return null // in Guard, it will be redirected. so, never happens
  }

  @Get('/redirect/google-login')
  @UseGuards(GoogleLoginGuard)
  async redirectGoogleLogin(@Req() request: Request, @Body() body: any) {
    // response contain jwt token.
    const user: any = request.user
    // console.log(typeof request.user)
    return await this.authService.login(user, body['refreshToken'])
  }

  @Get('/refresh')
  async rotateToken(@Req() request: Request, @Body() body: any) {
    await this.authService.rotateTokens(request, body)
  }
}
