import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
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
  async getSearchUser(
    @Query() userSearchDto: UserSearchDto,
    @Res() res: Response
  ) {
    const result = await this.searchService.searchUser(userSearchDto)

    //result의 길이가 0인경우 NO_CONTENT로 반환
    if (result.length === 0) res.status(HttpStatus.NO_CONTENT).send()
    else return res.status(HttpStatus.OK).send(result)
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
  async getSearchEvent(
    @Query() eventSearchDto: EventSearchDto,
    @Res() res: Response
  ) {
    console.log(eventSearchDto)
    const result = await this.searchService.searchEvent(eventSearchDto)
    if (result.length === 0) res.status(HttpStatus.NO_CONTENT).send()
    else return res.status(HttpStatus.OK).send(result)
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
