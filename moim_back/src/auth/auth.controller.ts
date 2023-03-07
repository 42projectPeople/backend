import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleLoginGuard } from './google-auth/google.guard'
import { JWTAuthGuard } from './jwt-auth/jwt-auth.guard'
import { Response } from 'express'
import { TokenDto } from './dto/tokenDto'

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
  ): Promise<TokenDto> {
    return await this.authService.login(request, response)
  }

  @Post('/refresh')
  async rotateToken(@Req() request: Request, @Body() body): Promise<TokenDto> {
    return await this.authService.rotateTokens(request, body)
  }
}
