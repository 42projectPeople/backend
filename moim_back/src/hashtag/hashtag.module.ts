import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagService } from './hashtag.service';

@Module({
  providers: [HashtagService],
})
export class HashtagModule {}
