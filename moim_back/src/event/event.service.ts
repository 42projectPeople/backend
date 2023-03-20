import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Event } from 'src/entity/Event.entity'
import { User_Events } from 'src/entity/User_Events.entity'
import { DataSource, Repository } from 'typeorm'
import { CreateEventDto } from './dto/CreateEvent.dto'
import { ReturnEventDto } from './dto/ReturnEvent.dto'
import { UpdateEventDto } from './dto/UpdateEvent.dto'
import { RolesInEvent } from './utils/rolesInEvent.enum'

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    private datasource: DataSource
  ) {}

  async findEvent(eventId: number, userId: number) {
    const queryRunner = this.datasource.createQueryRunner()
    let role = RolesInEvent.LOOKER
    try {
      await queryRunner.connect()
      await queryRunner.startTransaction()

      //eventId인 이벤트를 가져온다.
      const event = await queryRunner.manager
        .createQueryBuilder(Event, 'e')
        .select()
        .leftJoinAndSelect('e.hashtag', 'h', 'e.hashtagId = h.hashtagId')
        .where('eventId = :id', {
          id: eventId,
        })
        .getRawMany()

      //check length
      if (event.length != 1)
        throw new NotFoundException('해당 이벤트가 존재하지 않습니다.')
      if (event[0].e_hostId === userId) {
        role = RolesInEvent.HOST
      }

      //check if only current user might seems to be looker
      if (role != RolesInEvent.HOST) {
        const isGuest = await queryRunner.manager
          .createQueryBuilder(User_Events, 'u_e')
          .select()
          .where('u_e.eventId = :eventId AND u_e.userId = :userId', {
            eventId: eventId,
            userId: userId,
          })
          .getRawMany()
        if (isGuest.length != 0) role = RolesInEvent.GUEST
      }
      await queryRunner.commitTransaction()
      return new ReturnEventDto(event[0], role)
    } catch (e) {
      if (e.errno === 404) throw e
      throw new InternalServerErrorException()
    } finally {
      await queryRunner.release()
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
