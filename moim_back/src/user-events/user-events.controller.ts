import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { UserEventsService } from './user-events.service'
import { CreateUserEventDto } from './dto/create-user-event.dto'

@Controller('user-events')
export class UserEventsController {
  constructor(private readonly userEventsService: UserEventsService) {}

  /*
   * get events info that guestId is participate in
   * */
  @Get('/:userId')
  //session guard
  async getEventsParticipateIn(@Param('userId') userId: string) {
    /*
     * if (req.user.userId != userId)
     * 	throw new Forbidden("you are not :userId user");
     * */
    return await this.userEventsService.findAll(+userId)
  }

  /*
   * create new participate info
   * */
  @Post('/')
  postEventsParticipant(@Body() createUserEventDto: CreateUserEventDto) {
    return createUserEventDto
  }

  /*
   * delete current participate
   * */
  @Delete(':participateId')
  remove(@Param('participateId') participateId: string) {
    return this.userEventsService.remove(+participateId)
  }
}
