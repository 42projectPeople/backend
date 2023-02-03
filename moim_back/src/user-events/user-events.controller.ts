import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { UserEventsService } from './user-events.service'
import { CreateUserEventDto } from './dto/create-user-event.dto'
import { UpdateUserEventDto } from './dto/update-user-event.dto'

@Controller('user-events')
export class UserEventsController {
  constructor(private readonly userEventsService: UserEventsService) {}

  @Post()
  create(@Body() createUserEventDto: CreateUserEventDto) {
    return this.userEventsService.create(createUserEventDto)
  }

  @Get()
  findAll() {
    return this.userEventsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userEventsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserEventDto: UpdateUserEventDto
  ) {
    return this.userEventsService.update(+id, updateUserEventDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userEventsService.remove(+id)
  }
}
