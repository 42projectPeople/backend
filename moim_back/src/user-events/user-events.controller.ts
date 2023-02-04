import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { UserEventsService } from './user-events.service'
import { CreateUserEventDto } from './dto/create-user-event.dto'

@Controller('user-events')
export class UserEventsController {
  constructor(private readonly userEventsService: UserEventsService) {}

  @Get('/:guestId/asGuest')
  getEventsAsGuest() {
    return this.userEventsService.findAll()
  }

  @Get('/:hostId/asHost')
  getEventsAsHost() {
    return this.userEventsService.findAll()
  }

  @Post('/')
  postEventsParticipant(@Body() createUserEventDto: CreateUserEventDto) {
    return createUserEventDto
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userEventsService.remove(+id)
  }
}
