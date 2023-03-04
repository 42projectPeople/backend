import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Event } from 'src/entity/Event.entity'
import { Hashtag } from 'src/entity/Hashtag.entity'
import { HashtagController } from './hashtag.controller'
import { HashtagService } from './hashtag.service'

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag, Event])],
  controllers: [HashtagController],
  providers: [HashtagService],
})
export class HashtagModule {}
