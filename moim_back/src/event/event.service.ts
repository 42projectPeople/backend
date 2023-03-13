import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Event } from 'src/entity/Event.entity'
import { Repository } from 'typeorm'
import { CreateEventDto } from './dto/CreateEvent.dto'
import { UpdateEventDto } from './dto/UpdateEvent.dto'

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>
  ) {}

  async findEvent(eventId: number) {
    try {
      const result = await this.eventRepository
        .createQueryBuilder('e')
        .innerJoinAndSelect('e.host', 'u', 'u.userId = e.host')
        .innerJoinAndSelect('e.hashtag', 'h', 'h.hashtagId = e.hashtagId')
        .where('e.eventId=:id AND e.isDeleted = false', { id: eventId })
        .getMany()
      console.log(result)
      return result
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async createEvent(newEvent: CreateEventDto, userId: number) {
    //새로운 event 객체 생성
    const event = this.eventRepository.create({
      ...newEvent,
      host: userId,
    })
    //insert
    try {
      await this.eventRepository.insert(event)
    } catch (e) {
      console.log(e.message)
      if (e.errno === 1062)
        throw new ConflictException('너무 빠른 데이터 생성요청')
      else throw new InternalServerErrorException()
    }
  }

  /*
   * @Param eventId: 삭제할 이벤트의 아이디
   * @Param userId: 삭제할 이벤트의 소유자
   * @Param updateDto: 업데이트할 정보
   * */
  async updateEvent(
    eventId: number,
    userId: number,
    updateDto: UpdateEventDto
  ) {
    try {
      return await this.eventRepository
        .createQueryBuilder('event')
        .update()
        .set(updateDto)
        .where(
          'event.eventId = :eventId AND event.isDelete = false AND event.hostId = :userId',
          {
            eventId,
            userId,
          }
        )
        .execute()
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async removeEvent(eventId: number, userId: number) {
    try {
      return await this.eventRepository
        .createQueryBuilder('event')
        .update()
        .set({
          deletedAt: () => 'CURRENT_TIMESTAMP()',
          isDeleted: true,
        })
        .where(
          'event.eventId = :eventId AND event.isDelete = false AND event.hostId = :userId',
          {
            eventId,
            userId,
          }
        )
        .execute()
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }
}
