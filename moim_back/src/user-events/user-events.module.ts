import { Module } from '@nestjs/common'
import { UserEventsService } from './user-events.service'
import { UserEventsController } from './user-events.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User_Events } from 'src/entity/User_Events.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User_Events])],
  controllers: [UserEventsController],
  providers: [UserEventsService],
})
export class UserEventsModule {}
