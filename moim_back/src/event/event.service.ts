import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Event } from 'src/entity/Event.entity'
import { Repository } from 'typeorm'
import { EventDefaultDto } from './dto/event.default.dto'

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>
  ) {}

  async eventGet(eventId: number) {
    return await this.eventRepository
      .createQueryBuilder('event')
      .innerJoinAndSelect('user', 'u', 'u.userId = event.hostId')
      .innerJoinAndSelect('hashtag', 'ha', 'ha.hashtagId = event.hashtagId')
      .where('event.eventId=:id AND event.deletedAt IS NULL', { id: eventId })
      .execute()
  }

  async eventCreate(newEvent: EventDefaultDto) {
    try {
      const event = await this.eventRepository.save(
        EventDefaultDto.transEventDto(newEvent)
      )

      return this.eventGet(event.eventId)
    } catch (e) {
      throw new NotFoundException('db injection')
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

      return await this.eventGet(eventId)
    } catch (e) {
      throw new NotFoundException('db injection')
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
      throw new NotFoundException('db injection')
    }
  }
}
