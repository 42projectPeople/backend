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
      const query = qb

      /*
       * ISSUE #126: hashtag없는 경우 전체 글 가져오도록 설정됨.
       */
      if (dto.getHashtagId())
        query.where('e.hashtagId = :id', { id: dto.getHashtagId() })

      query.andWhere('e.isDeleted = false').andWhere('e.eventDate > now()')

      //view 수에따른 조회
      if (dto.getRecommendation() === true) query.addOrderBy('views', 'DESC')

      //최신순 정렬
      if (dto.getSortByDate() === true) query.addOrderBy('eventDate', 'DESC')

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
