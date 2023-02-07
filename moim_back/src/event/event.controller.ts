import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Event } from 'src/entity/Event.entity'
import { UpdateEvent } from 'typeorm'
import { EventCreateDto } from './dto/event.create.dto'
import { EventUpdateDto } from './dto/event.update.dto'
import { EventService } from './event.service'

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get('/:id')
  @UsePipes(
    new ValidationPipe({
      transform: true, //지정된 객체로 자동변환
      whitelist: true, //수신돼선 안되는 속성 필터링
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async getEvent(@Param('id', ParseIntPipe) id: number) {
    return await this.eventService.eventFindOneById(id)
  }

  @Post('')
  @UsePipes(
    new ValidationPipe({
      transform: true, //지정된 객체로 자동변환
      whitelist: true, //수신돼선 안되는 속성 필터링
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  eventCreate(@Body() body: EventCreateDto) {
    return this.eventService.eventCreate(body)
  }

  @Patch(':id')
  eventUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EventUpdateDto
  ) {
    return this.eventService.eventUpdate(id, body)
  }
}
