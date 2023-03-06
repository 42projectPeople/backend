import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entity/User.entity'
import { ConfigModule } from '@nestjs/config'
import { TokenSession } from '../entity/TokenSession.entity'
import { JwtService } from '@nestjs/jwt'
import { GoogleLoginGuard, GoogleSignUpGuard } from './google-auth/google.guard'
import { JWTAuthGuard } from './jwt-auth/jwt-auth.guard'
import {
  GoogleLoginStrategy,
  GoogleSignupStrategy,
} from './google-auth/google-strategy'
import { JwtAuthStrategy } from './jwt-auth/jwt-strategy'
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([TokenSession], 'session'),
    ConfigModule,
  ],
  providers: [
    AuthService,
    JwtService,
    GoogleLoginGuard,
    GoogleSignUpGuard,
    JWTAuthGuard,
    JwtAuthStrategy,
    GoogleSignupStrategy,
    GoogleLoginStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
