import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleSignUpGuard, GoogleLoginGuard } from './google-auth/google.guard'
import { JWTAuthGuard } from './jwt-auth/jwt-auth.guard'
import { response } from 'express'

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
    return await this.authService.signup(request) // check needed
  }

  @Get('/login/google')
  @UseGuards(GoogleLoginGuard)
  async loginGoogle() {
    return null // in Guard, it will be redirected. so, never happens
  }

  @Get('/redirect/google-login')
  @UseGuards(GoogleLoginGuard)
  async redirectGoogleLogin(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return await this.authService.login(request, response)
  }

  @Post('/refresh')
  async rotateToken(@Req() request: Request, @Body() body) {
    return await this.authService.rotateTokens(request, body)
  }
}
