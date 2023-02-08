import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/entity/User.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { User_Events } from '../entity/User_Events.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([User_Events]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
