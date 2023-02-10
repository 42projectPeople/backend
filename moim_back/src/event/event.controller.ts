import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { EventDefaultDto } from './dto/event.default.dto'
import { EventService } from './event.service'

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get('/:id')
  async eventGet(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const ret = await this.eventService.eventGet(id)
    if (ret == '')
      // 못 찾은 경우
      return res.status(HttpStatus.NOT_FOUND).send()
    else return res.status(HttpStatus.OK).json(ret).send()
  }

  @Post('')
  eventCreate(@Body() body: EventDefaultDto) {
    console.log(body)
    return this.eventService.eventCreate(body)
  }

  @Patch('/:id')
  eventUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EventDefaultDto
  ) {
    return this.eventService.eventUpdate(id, body)
  }

  @Delete('/:id')
  eventDelete(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    this.eventService.eventDelete(id)
    return res.status(HttpStatus.OK).json({ msg: 'delete finished!' })
  }
}
