import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Event } from 'src/entity/Event.entity'
import { CreateEventDto } from './dto/event.create.dto'
import { EventGetDto } from './dto/event.get.dto'
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
  async FindOneEvent(@Body() body: EventGetDto): Promise<Event> {
    const ret = await this.eventService.getEventPage(body.eventId, body.hostId)
    return ret
  }

  @Post('/')
  async CreateEvent(@Body() body: CreateEventDto) {
    const ret = await this.eventService.eventCreate(body)
    return ret
  }

  @Patch('/:id')
  async UpdateEvent(@Body() body: EventUpdateDto) {
    const ret = await this.eventService.eventUpdate(body)
    return ret
  }
}
