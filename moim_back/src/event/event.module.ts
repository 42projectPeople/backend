import { Module } from '@nestjs/common'
import { EventService } from './event.service'
import { EventController } from './event.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Event } from 'src/entity/Event.entity'
import { User } from 'src/entity/User.entity'
import { Hashtag } from 'src/entity/Hashtag.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Event, User, Hashtag])],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
