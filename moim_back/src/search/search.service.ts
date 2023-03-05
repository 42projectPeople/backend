import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Hashtag } from 'src/entity/Hashtag.entity'
import { User } from 'src/entity/User.entity'
import { Event } from 'src/entity/Event.entity'
import { Repository } from 'typeorm'
import { UserSearchDto } from './dto/UserSearch.dto'
import { EventSearchDto } from './dto/EventSearch.dto'
import { HashtagSearchDto } from './dto/HashtagSearch.dto'

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Event)
    private eventRepository: Repository<Event>,

    @InjectRepository(Hashtag)
    private hashtagRepo: Repository<Hashtag>
  ) {}

  async searchUser() {}

  async searchEvent() {}

  async searchHashtag() {}
}
