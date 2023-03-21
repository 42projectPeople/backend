import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { JWTAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard'
import { CreateEventDto } from './dto/CreateEvent.dto'
import { UpdateEventDto } from './dto/UpdateEvent.dto'
import { EventService } from './event.service'
import { DocsCreateEvent } from './swagger/DocsCreateEvent.docs'
import { DocsUpdateEvent } from './swagger/DocsUpdateEvent.docs'
import { DocsDeleteEvent } from './swagger/DocsDeleteEvent.docs'
import { DocsGetEventByEventId } from './swagger/DocsGetEventByEventId.docs'

@Controller('event')
@ApiTags('event api')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/:eventId')
  @DocsGetEventByEventId()
  @UseGuards(JWTAuthGuard)
  async getEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const result = await this.eventService.findEvent(eventId, req.user.userId)
    return res.status(HttpStatus.OK).send(result)
  }

  @Post('')
  @DocsCreateEvent()
  @UseGuards(JWTAuthGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async postEvent(
    @Body() body: CreateEventDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const ret = await this.eventService.createEvent(body, req.user.userId)
    res.status(HttpStatus.CREATED).json({
      message: 'Event created successfully',
      data: ret,
    })
    return res
  }

  @Patch('/:id')
  @DocsUpdateEvent()
  @UseGuards(JWTAuthGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async patchEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEventDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const result = await this.eventService.updateEvent(
      id,
      req.user.userId,
      body
    )
    if (result.affected === 0)
      throw new NotFoundException('업데이트할 데이터가 없습니다.')
    return res.sendStatus(HttpStatus.OK)
  }

  @Delete('/:id')
  @DocsDeleteEvent()
  @UseGuards(JWTAuthGuard)
  async deleteEvent(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const result = await this.eventService.removeEvent(id, req.user.userId)
    if (result.affected === 0)
      throw new NotFoundException('삭제할 데이터가 없습니다.')
    return res.sendStatus(HttpStatus.NO_CONTENT)
  }
}
