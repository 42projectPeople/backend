import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entity/User.entity'
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
