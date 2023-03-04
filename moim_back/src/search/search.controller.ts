import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { EventSearchDto } from './dto/EventSearch.dto'
import { HashtagSearchDto } from './dto/HashtagSearch.dto'
import { UserSearchDto } from './dto/UserSearch.dto'
import { SearchService } from './search.service'
import { DocsGetSearchEvent } from './swagger/DocsGetSearchEvent.dto'
import { DocsGetSearchHashtag } from './swagger/DocsGetSearchHashtag.dto'
import { DocsGetSearchUser } from './swagger/DocsGetSearchUser.dto'

@Controller('search')
@ApiTags('search api')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @DocsGetSearchUser()
  @Get('/user')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async getSearchUser(@Query() userSearchDto: UserSearchDto) {
    return await this.searchService.searchUser(userSearchDto)
  }

  @DocsGetSearchEvent()
  @Get('/event')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async getSearchEvent(@Query() eventSearchDto: EventSearchDto) {
    return await this.searchService.searchEvent(eventSearchDto)
  }

  @DocsGetSearchHashtag()
  @Get('/hashtag')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async getSearchHashtag(@Query() hashtagDto: HashtagSearchDto) {
    return await this.searchService.searchHashtag(hashtagDto)
  }
}
