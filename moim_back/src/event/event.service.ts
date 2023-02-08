import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Event } from 'src/entity/Event.entity'
import { Hashtag } from 'src/entity/Hashtag.entity'
import { User } from 'src/entity/User.entity'
import { Repository } from 'typeorm'
import { EventCreateDto } from './dto/event.create.dto'
import { EventUpdateDto } from './dto/event.update.dto'

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Hashtag) private hashtagRepository: Repository<Hashtag>
  ) {}

  async eventGet(eventId: number) {
    return await this.eventRepository
      .createQueryBuilder('event')
      .innerJoinAndSelect('user', 'u', 'u.userId = event.hostId')
      .innerJoinAndSelect('hashtag', 'ha', 'ha.hashtagId = event.hashtagId')
      .where('event.eventId=:id', { id: eventId })
      .execute()
  }

  async eventCreate(newEvent: EventCreateDto) {
    try {
      const createEvent = this.transCreateDto(newEvent)
      return this.eventGet(createEvent.eventId)
    } catch (e) {
      throw new NotFoundException('db injection')
    }
  }

  async eventUpdate(eventId: number, update: EventUpdateDto) {
    try {
      await this.eventRepository
        .createQueryBuilder()
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
          modifiedAt: () => 'CURRENT_TIMESTAMP',
        })
        .where('eventId = :id', { id: eventId })
        .execute()

      return await this.eventGet(eventId)
    } catch (e) {
      throw new NotFoundException('db injection')
    }
  }
  async eventDelete(eventId: number) {
    try {
      const deleteEvent = await this.eventRepository
        .createQueryBuilder()
        .update()
        .set({
          isDelete: true,
          deletedAt: () => 'CURRENT_TIMESTAMP',
        })
        .where('eventId=:id', { id: eventId })
        .execute()
      return deleteEvent
    } catch (e) {
      throw new NotFoundException('db injection')
    }
  }

  transCreateDto(newEvent: EventCreateDto) {
    const event = new Event()

    event.eventDate = newEvent.eventDate
    event.main_image = newEvent.main_image
    event.content = newEvent.content
    event.location = newEvent.location
    event.latitude = newEvent.latitude
    event.longitude = newEvent.longitude
    event.header = newEvent.header
    event.hashtag = newEvent.hashtag
    event.host = newEvent.host
    event.maxParticipant = newEvent.maxParticipant
    event.curParticipant = 0
    event.rating = 0

    return event
  }
}
