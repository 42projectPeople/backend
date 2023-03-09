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

  async eventUpdate(eventId: number, update: EventDefaultDto) {
    try {
      const ret = await this.eventRepository
        .createQueryBuilder('event')
        .update()
        .set({
          eventDate: update.eventDate,
          main_image: update.main_image,
          content: update.content,
          location: update.location,
          latitude: update.latitude,
          longitude: update.longitude,
          header: update.header,
          maxParticipant: update.maxParticipant,
          hashtag: update.hashtag,
        })
        .where('event.eventId = :id AND event.deletedAt IS NULL', {
          id: eventId,
        })
        .execute()

      if (ret.affected === 0)
        return new EntityNotFoundError('잘못된 업데이트 요청입니다.', 404)
      return await this.eventGet(eventId)
    } catch (e) {
      throw new ConflictException('이벤트 업데이트를 실패했습니다.')
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
