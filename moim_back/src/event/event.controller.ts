import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { env } from 'process'
import { Event } from 'src/entity/Event.entity'
import { CreateEventDto } from './dto/event.create.dto'
import { EventGetDto } from './dto/event.get.dto'
import { EventService } from './event.service'

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get('/:id')
  async FindOneEvent(@Body() body: EventGetDto): Promise<Event> {
    const ret = await this.eventService.getEventPage(body.eventId, body.hostId)
    return ret
  }

  @Post('/')
  async CreateEvent(@Body() body: CreateEventDto) {
    const ret = await this.eventService.eventCreate(body)
    return ret
  }

  // @Patch('/:id')
  // async UpdateEvent(@Body() body: Upda)
}
