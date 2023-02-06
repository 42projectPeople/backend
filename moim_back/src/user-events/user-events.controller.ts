import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UserEventsService } from './user-events.service'
import { CreateUserEventDto } from './dto/create-user-event.dto'
import { DeleteUserEventDto } from './dto/delete-user-event.dto'

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
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async postEventsParticipant(@Body() createUserEventDto: CreateUserEventDto) {
    /*
     * if (req.user.userId != createUserEventDto.userId)
     * 	throe new forbidden()
     * */
    await this.userEventsService.create(createUserEventDto)
  }

  /*
   * delete current participate
   * */
  @Delete('/:participateId')
  //session guard
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async deleteParticipant(
    @Param('participateId') participateId: string,
    deleteUserDto: DeleteUserEventDto
  ) {
    /*
     * if (req.user.userId != deleteUserDto.userId)
     * 	throw new forbidden()
     * */
    await this.userEventsService.remove(+participateId)
  }
}
