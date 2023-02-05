import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { Event } from 'src/entity/Event.entity'
import { CreateEventDto } from './dto/event.create.dto'
import { EventService } from './event.service'

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get('/:id')
  async FindOneEvent(@Param('id') id: number): Promise<Event> {
    const ret = await this.eventService.eventFindOneById(id)
    return ret
  }
  @Post('/')
  async CreateEvent(@Body() body: CreateEventDto) {
    const ret = await this.eventService.eventCreate(body)
    return ret
  }
}
