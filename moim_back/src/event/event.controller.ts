import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Event } from 'src/entity/Event.entity'
import { EventCreateDto } from './dto/event.create.dto'
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
  async eventCreate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EventCreateDto
  ) {
    return await this.eventService.eventCreate(id, body)
  }
  // @Post('')
  // async CreateEvent(@Body() body: any): Promise<Event> {
  //   const ret = await this.eventService.eventCreate(body)
  //   console.log(`\nCreate :${ret}`)
  //   return ret
  // }
}
