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
      .where('event.eventId=:id AND event.deletedAt IS NULL', { id: eventId })
      .execute()
  }

  async eventCreate(newEvent: EventCreateDto) {
    try {
      const event = await this.eventRepository.save(
        EventCreateDto.transCreateDto(newEvent)
      )

      return this.eventGet(event.eventId)
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
        .createQueryBuilder('event')
        .softDelete()
        .where('event.eventId = :id AND event.deletedAt IS NULL', {
          id: eventId,
        })
        .execute()
      console.log('\n1111')
      return deleteEvent
    } catch (e) {
      throw new NotFoundException('db injection')
    }
  }
}
