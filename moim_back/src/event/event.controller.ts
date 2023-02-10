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
    if (ret == '') {
      // 못 찾은 경우
      return res.status(HttpStatus.NOT_FOUND).send()
    } else {
      return res.status(HttpStatus.OK).json(ret).send()
    }
  }

  @Post('')
  async eventCreate(@Body() body: EventDefaultDto, @Res() res: Response) {
    const ret = await this.eventService.eventCreate(body)
    if (ret) {
      //생성성공
      return res.status(HttpStatus.CREATED).json(ret)
    } else if (ret == '') {
      //생성 실패
      return res.status(HttpStatus.CONFLICT).json({ msg: '생성실패' })
    }
  }

  @Patch('/:id')
  async eventUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EventDefaultDto,
    @Res() res: Response
  ) {
    const ret = await this.eventService.eventUpdate(id, body)
    if (ret) {
      return res.status(HttpStatus.CREATED).json(ret)
    }
  }

  @Delete('/:id')
  async eventDelete(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    await this.eventService.eventDelete(id)
    return res.status(HttpStatus.OK).json({ msg: 'delete finished!' })
  }
}
