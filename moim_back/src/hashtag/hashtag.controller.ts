import { Controller, Get, Param } from '@nestjs/common'
import { HashtagService } from './hashtag.service'

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Get('/')
  async getHashtags() {
    return await this.hashtagService.findAll()
  }

  @Get('/events/:hashtagId')
  async getEventsByHashtag(@Param('hashtagId') hashtagId: string) {
    return await this.hashtagService.findEventsByHashtagId(+hashtagId)
  }
}
