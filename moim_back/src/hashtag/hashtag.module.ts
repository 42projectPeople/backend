import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from 'src/entity/Hashtag.entity';
import { HashtagService } from './hashtag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag])],
  providers: [HashtagService],
})
export class HashtagModule {}
