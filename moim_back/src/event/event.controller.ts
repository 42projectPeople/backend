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
import { DocsGetEvent } from './swagger/DocsGetEvent.docs'
import { DocsDeleteEvent } from './swagger/DocsDeleteEvent.docs'

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get('/:id')
  @ApiOkResponse({
    type: EventReturnDto,
  })
  async eventGet(@Param('id', ParseIntPipe) id: number) {
    return await this.eventService.eventGet(id)
  }

  @Post('')
  async eventCreate(@Body() body: EventDefaultDto) {
    return await this.eventService.eventCreate(body)
  }

  @Patch('/:id')
  async eventUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EventDefaultDto
  ) {
    return await this.eventService.eventUpdate(id, body)
  }

  @Delete('/:id')
  async eventDelete(@Param('id', ParseIntPipe) id: number) {
    await this.eventService.eventDelete(id)
  }
}
