import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User_Events } from 'src/entity/User_Events.entity'
import { Repository } from 'typeorm'
import { CreateUserEventDto } from './dto/create-user-event.dto'

@Injectable()
export class UserEventsService {
  constructor(
    @InjectRepository(User_Events)
    private readonly userEventsRepository: Repository<User_Events>
  ) {}

  create(createUserEventDto: CreateUserEventDto) {
    return 'This action adds a new userEvent'
  }

  async findAll(userId: number) {
    return await this.userEventsRepository
      .createQueryBuilder('user_events')
      .innerJoinAndSelect('event', 'e', 'e.eventId = user_events.eventId')
      .where('user_events.userId = :userId', { userId: userId })
      .innerJoinAndSelect('user', 'u', 'u.userId = e.hostId')
      .innerJoinAndSelect('hashtag', 'h', 'h.hashtagId = e.hashtagId')
      .execute()
  }

  remove(id: number) {
    return `This action removes a #${id} userEvent`
  }
}
