import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Hashtag } from 'src/entity/Hashtag.entity'
import { User } from 'src/entity/User.entity'
import { SearchController } from './search.controller'
import { SearchService } from './search.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Event, Hashtag])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
