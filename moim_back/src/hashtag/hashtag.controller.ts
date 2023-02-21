import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { controllerEventByHashtagIdDto } from './dto/controllerEventByHashtagId.dto'
import { ResponseEventsDto } from './dto/ResponseEvents.dto'
import { serviceEventByHashtagDto } from './dto/serviceEventByHashtag.dto'
import { HashtagService } from './hashtag.service'

@Controller('hashtag')
@ApiTags('hashtag api')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Get('/')
  @ApiOkResponse({
    description: 'Returns all of hashtags',
  })
  async getHashtags() {
    return await this.hashtagService.findAll()
  }

  @Get('/events/:hashtagId')
  async getEventsByHashtag(@Param('hashtagId') hashtagId: string) {
    return await this.hashtagService.findEventsByHashtagId(+hashtagId)
  }
}
