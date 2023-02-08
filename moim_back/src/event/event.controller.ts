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
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Response } from 'express'
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
  async getEvent(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const ret = await this.eventService.eventGet(id)
    if (ret == '')
      // 못 찾은 경우
      return res.status(HttpStatus.NOT_FOUND).send()
    else return res.status(HttpStatus.CREATED).json(ret).send()
  }

  @Post('')
  eventCreate(@Body() body: EventCreateDto) {
    console.log(body)
    return this.eventService.eventCreate(body)
  }

  @Patch(':id')
  @UsePipes(
    new ValidationPipe({
      transform: true, //지정된 객체로 자동변환
      whitelist: true, //수신돼선 안되는 속성 필터링
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  eventUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EventUpdateDto
  ) {
    return this.eventService.eventUpdate(id, body)
  }

  @Delete(':id')
  @UsePipes(
    new ValidationPipe({
      transform: true, //지정된 객체로 자동변환
      whitelist: true, //수신돼선 안되는 속성 필터링
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  eventDelete(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.eventDelete(id)
  }
}
