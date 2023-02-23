import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Event } from 'src/entity/Event.entity'
import { Hashtag } from 'src/entity/Hashtag.entity'
import { User } from 'src/entity/User.entity'
import { DataSource, EntityNotFoundError, Repository } from 'typeorm'
import { EventDefaultDto } from './dto/event.default.dto'
import { EventReturnDto } from './dto/event.return.dto'

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Hashtag) private hashtagRepository: Repository<Hashtag>,
    private dataSource: DataSource
  ) {}

  async eventGet(eventId: number): Promise<EventReturnDto> {
    try {
      const event = await this.eventRepository
        .createQueryBuilder('event')
        .where('event.eventId=:id', { id: eventId })
        .getOne()
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.userId=:id', { id: event.host_Id })
        .getOne()
      const hashtag = await this.hashtagRepository
        .createQueryBuilder('hashtag')
        .where('hashtag.hashtagId=:id', { id: event.hashtag_Id })
        .getOne()
      return this.transEventReturnDto(event, user, hashtag)
    } catch (e) {
      throw new EntityNotFoundError('이벤트가 존재하지 않습니다.', 404)
    }
  }
  async transEventReturnDto(
    event: Event,
    user: User,
    hashtag: Hashtag
  ): Promise<EventReturnDto> {
    const returnDto = new EventReturnDto()
    returnDto.eventId = event.eventId
    returnDto.eventDate = event.eventDate
    returnDto.event_modifiedAt = event.modifiedAt
    returnDto.event_main_image = event.main_image
    returnDto.event_content = event.content
    returnDto.event_views = event.views
    returnDto.event_location = event.location
    returnDto.event_latitude = event.latitude
    returnDto.event_longitude = event.longitude
    returnDto.event_header = event.header
    returnDto.event_rating = event.rating
    returnDto.event_maxParticipant = event.maxParticipant
    returnDto.event_curParticipant = event.curParticipant
    returnDto.hostId = event.host_Id
    returnDto.hostNickName = user.userNickName
    returnDto.hostProfilePhoto = user.userProfilePhoto
    returnDto.hostRole = user.userRole
    returnDto.hostTitle = user.userTitle
    returnDto.hashtagId = event.hashtag_Id
    returnDto.hashtagName = hashtag.hashtagName

    return returnDto
  }

  async eventCreate(newEvent: EventDefaultDto): Promise<EventReturnDto> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const event = await queryRunner.manager.save(
        EventDefaultDto.transEventDto(newEvent)
      )
      await queryRunner.commitTransaction()
      await queryRunner.release()
      return await this.eventGet(event.eventId)
    } catch (e) {
      await queryRunner.rollbackTransaction()
      throw new ConflictException('생성에 실패했습니다.')
    }
  }

  async eventUpdate(
    eventId: number,
    update: EventDefaultDto
  ): Promise<EventReturnDto> {
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

      if (!ret)
        throw new EntityNotFoundError('잘못된 업데이트 요청입니다.', 404)
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
      if (!deleteEvent)
        throw new EntityNotFoundError('잘못된 삭제 요청입니다.', 404)
      return deleteEvent
    } catch (e) {
      throw new ConflictException('이벤트 삭제에 실패했습니다.')
    }
  }
}
