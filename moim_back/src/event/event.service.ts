import { ConflictException, Injectable } from '@nestjs/common'
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
    let event = null
    try {
      event = await this.eventRepository
        .createQueryBuilder('event')
        .innerJoinAndSelect('user', 'user', 'user.userId = event.hostId')
        .innerJoinAndSelect(
          'hashtag',
          'hashtag',
          'hashtag.hashtagId = event.hashtagId'
        )
        .where('event.eventId=:id AND event.deletedAt IS NULL', { id: eventId })
        .execute()
    } catch (e) {
      return new EntityNotFoundError('이벤트가 존재하지 않습니다.', 404)
    } finally {
      return event
    }
  }

  async eventCreate(newEvent: EventDefaultDto) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    let event = null
    try {
      event = await queryRunner.manager.save(
        EventDefaultDto.transEventDto(newEvent)
      )
      await queryRunner.commitTransaction()
    } catch (e) {
      await queryRunner.rollbackTransaction()
      return new ConflictException('생성에 실패했습니다.')
    } finally {
      await queryRunner.release()
      return event
    }
  }

  async eventUpdate(eventId: number, update: EventDefaultDto) {
    try {
      await this.eventRepository
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
    } catch (e) {
      throw new ConflictException('이벤트 업데이트를 실패했습니다.')
    } finally {
      return await this.eventGet(eventId)
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
      return deleteEvent
    } catch (e) {
      throw new ConflictException('이벤트 삭제에 실패했습니다.')
    }
  }
}
