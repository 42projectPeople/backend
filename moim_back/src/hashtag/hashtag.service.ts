import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Hashtag } from 'src/entity/Hashtag.entity'
import { Repository } from 'typeorm'

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private hashtagRepository: Repository<Hashtag>
  ) {}

  //get all hashtags
  async findAll(): Promise<Hashtag[]> {
    return await this.hashtagRepository.find()
  }

  async findEventsByHashtagId(hashtagId: number): Promise<Hashtag[]> {
    return await this.hashtagRepository
      .createQueryBuilder('hashtag')
      .innerJoinAndSelect(
        'event',
        'event',
        'event.hashtagId = hashtag.hashtagId'
      )
      .where('event.hashtagId = :id', { id: hashtagId })
      .execute()
  }
}
