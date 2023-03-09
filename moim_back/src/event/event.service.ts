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

  async eventGet(eventId: number) {
    try {
      return await this.eventRepository
        .createQueryBuilder('event')
        .innerJoinAndSelect('event.host', 'u', 'u.userId = event.hostId')
        .innerJoinAndSelect(
          'event.hashtag',
          'h',
          'h.hashtagId = event.hashtagId'
        )
        .where('event.eventId=:id AND event.isDeleted = false', { id: eventId })
        .getMany()
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async eventCreate(newEvent: CreateEventDto, userId: number) {
    //새로운 event 객체 생성
    const event = this.eventRepository.create({ ...newEvent, host: userId })
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
  async eventUpdate(
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

  async eventDelete(eventId: number) {
    try {
      const deleteEvent = await this.eventRepository
        .createQueryBuilder('event')
        .softDelete()
        .where('event.eventId = :id AND event.deletedAt IS NULL', {
          id: eventId,
        })
        .execute()
      if (deleteEvent.affected === 0)
        throw new EntityNotFoundError('잘못된 삭제 요청입니다.', 404)
      return deleteEvent
    } catch (e) {
      throw new ConflictException('이벤트 삭제에 실패했습니다.')
    }
  }
}
