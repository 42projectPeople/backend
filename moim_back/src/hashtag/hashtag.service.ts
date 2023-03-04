import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Event } from 'src/entity/Event.entity'
import { Hashtag } from 'src/entity/Hashtag.entity'
import { Repository } from 'typeorm'
import { serviceEventByHashtagDto } from './dto/serviceEventByHashtag.dto'

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private hashtagRepository: Repository<Hashtag>,

    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {}

  //get all hashtags
  async findAll(): Promise<Hashtag[]> {
    return await this.hashtagRepository.find()
  }

  async findEventsByHashtagId(dto: serviceEventByHashtagDto): Promise<Event[]> {
    const qb = this.eventRepository.createQueryBuilder('e')
    try {
      const query = qb.where('e.hashtagId = :id', { id: dto.getHashtagId() })

      if (dto.getRecommendation() === true) query.orderBy('views', 'DESC')

      query
        .offset(dto.getStartIndex()) //
        .limit(dto.getPageSize())

      return await query.execute()
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  //
  //
}
