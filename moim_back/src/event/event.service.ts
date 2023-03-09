import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Event } from 'src/entity/Event.entity'
import { DataSource, EntityNotFoundError, Repository } from 'typeorm'
import { EventDefaultDto } from './dto/event.default.dto'

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    private dataSource: DataSource
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

  async eventCreate(newEvent: EventDefaultDto) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const event = await queryRunner.manager.save(
        EventDefaultDto.transEventDto(newEvent)
      )
      await queryRunner.commitTransaction()
      await queryRunner.release()
      return event
    } catch (e) {
      await queryRunner.rollbackTransaction()
      throw new ConflictException('생성에 실패했습니다.')
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
