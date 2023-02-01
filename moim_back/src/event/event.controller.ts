import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { Event } from 'src/entity/Event.entity'
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
  async CreateEvent(@Body() body: any): Promise<Event> {
    const ret = await this.eventService.eventCreate(body)
    console.log(`\nCreate :${ret}`)
    return ret
  }
}
