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
import { serviceEventByHashtagDto } from './dto/serviceEventByHashtag.dto'
import { HashtagService } from './hashtag.service'
import { DocsGetEventsByHashtag } from './swagger/DocsGetEventsByHashtag.dto'
import { Event } from 'src/entity/Event.entity'

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
  @DocsGetEventsByHashtag()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      always: true,
    })
  )
  async getEventsByHashtag(
    @Param('hashtagId') hashtagId: string,
    @Query() queryDto: controllerEventByHashtagIdDto
  ): Promise<Event[]> {
    return await this.hashtagService.findEventsByHashtagId(
      new serviceEventByHashtagDto(queryDto, +hashtagId)
    )
  }
}
