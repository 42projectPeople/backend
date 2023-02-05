import { ConflictException, Injectable } from '@nestjs/common'
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

  async create(createUserEventDto: CreateUserEventDto) {
    try {
      await this.userEventsRepository
        .createQueryBuilder('user_events')
        .insert()
        .into(User_Events)
        .values(CreateUserEventDto.toEntity(createUserEventDto))
        .execute()
    } catch (e) {
      //이미 존재하는 참여정보 == 1062 err
      if (e.errno == 1062) throw new ConflictException()
      else throw e
    }
  }

  async findAll(userId: number) {
    return await this.userEventsRepository
      .createQueryBuilder('user_events')
      .innerJoinAndSelect('event', 'e', 'e.eventId = user_events.eventId')
      .where('user_events.userId = :userId AND user_events.deletedAt IS NULL', {
        userId: userId,
      })
      .innerJoinAndSelect('user', 'u', 'u.userId = e.hostId')
      .innerJoinAndSelect('hashtag', 'h', 'h.hashtagId = e.hashtagId')
      .execute()
  }

  async remove(participateId: number) {
    await this.userEventsRepository
      .createQueryBuilder('user_events')
      .update()
      .set({
        isDeleted: true,
        deletedAt: () => 'CURRENT_TIMESTAMP',
      })
      .where('user_events.participentId = :id', { id: participateId })
      .execute()
  }
}
