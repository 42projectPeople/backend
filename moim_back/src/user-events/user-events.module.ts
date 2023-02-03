import { Module } from '@nestjs/common'
import { UserEventsService } from './user-events.service'
import { UserEventsController } from './user-events.controller'

@Module({
  controllers: [UserEventsController],
  providers: [UserEventsService],
})
export class UserEventsModule {}
