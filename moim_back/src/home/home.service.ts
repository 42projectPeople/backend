import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { Event } from '../entity/Event.entity'
import { HomeReturnDto, summaryEvent } from './dto/HomeReturnDto'

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private datasource: DataSource
  ) {}

  async findHome() {
    const queryRunner = this.datasource.createQueryRunner()
    try {
      await queryRunner.connect()
      await queryRunner.startTransaction()

      // const now = new Date()

      /* .andWhere('event.eventDate > :now', { now: now.toISOString() })
        초반엔 데이터가 없을 예정이라.... 몇개 안나올 것 같아서... 일단 주석이요.......ㅠㅠㅠ*/
      const events = await queryRunner.manager
        .createQueryBuilder()
        .select([
          'event.eventId',
          'event.images',
          'event.location',
          'event.header',
        ])
        .from(Event, 'event')
        .where('event.isDeleted = :isDeleted', { isDeleted: false })
        .orderBy('event.views', 'DESC')
        .limit(8)
        .getRawMany()

      await queryRunner.commitTransaction()
      return this.transFerBySummaryEvents(events)
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
  }

  async transFerBySummaryEvents(events) {
    const result = new HomeReturnDto()
    result.events = []
    console.log(events)
    for (let i = 0; i < events.length; ++i) {
      const image = events[i].event_images.split(' ')
      const tmpEvent: summaryEvent = {
        eventId: events[i].event_eventId,
        eventImage: image[0],
        eventAddress: events[i].event_location,
        eventTilte: events[i].event_header,
      }
      result.events.push(tmpEvent)
    }

    return result
  }
}
