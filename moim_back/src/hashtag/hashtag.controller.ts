import { Controller, Get } from '@nestjs/common';
import { HashtagService } from './hashtag.service';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Get('/')
  async getHashtags() {
    return await this.hashtagService.findAll();
  }
}
