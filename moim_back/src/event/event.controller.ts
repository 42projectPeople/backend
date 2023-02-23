import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { EventDefaultDto } from './dto/event.default.dto'
import { EventReturnDto } from './dto/event.return.dto'
import { EventService } from './event.service'

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get('/:id')
  async eventGet(
    @Param('id', ParseIntPipe) id: number
  ): Promise<EventReturnDto> {
    return await this.eventService.eventGet(id)
  }

  @Post('')
  async eventCreate(@Body() body: EventDefaultDto): Promise<EventReturnDto> {
    return await this.eventService.eventCreate(body)
  }

  @Patch('/:id')
  async eventUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EventDefaultDto
  ): Promise<EventReturnDto> {
    return await this.eventService.eventUpdate(id, body)
  }

  @Delete('/:id')
  async eventDelete(@Param('id', ParseIntPipe) id: number) {
    await this.eventService.eventDelete(id)
  }
}
