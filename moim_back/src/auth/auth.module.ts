import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entity/User.entity'
import { ConfigModule } from '@nestjs/config'
import { TokenSession } from '../entity/TokenSession.entity'
import { JwtService } from '@nestjs/jwt'
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([TokenSession], 'session'),
    ConfigModule,
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
