import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Hashtag } from 'src/entity/Hashtag.entity'
import { User } from 'src/entity/User.entity'
import { Event } from 'src/entity/Event.entity'
import { Repository } from 'typeorm'

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Hashtag)
    private hashtagRepo: Repository<Hashtag>,

    @InjectRepository(Event)
    private eventRepository: Repository<Event>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async searchUser() {}

  async searchEvent() {}

  async searchHashtag() {}
}
