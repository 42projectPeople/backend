import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/entity/User.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { User_Events } from '../entity/User_Events.entity'
import { Event } from '../entity/Event.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, User_Events, Event])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
