import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
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
    console.log(`\n\n ret = ${ret}`)
    return ret
  }
  @Post('')
  async CreateEvent(@Body() body: CreateEventDto) {
    const ret = await this.eventService.eventCreate(body)
    if (!ret)
      return new BadRequestException(
        '해시태그 또는, 호스트가 존재하지 않습니다.'
      )
    console.log(`\nCreate :${ret}`)
    return ret
  }
}
