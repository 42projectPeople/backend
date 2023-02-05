import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Event } from 'src/entity/Event.entity'
import { User } from 'src/entity/User.entity'
import { Repository } from 'typeorm'
import { CreateEventDto } from './dto/event.create.dto'
import { EventUpdateDto } from './dto/event.update.dto'

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}
  async eventFindOneById(eventId: number): Promise<Event> {
    return await this.eventRepository.findOneBy({ eventId })
  }
  async eventCreate(event: CreateEventDto): Promise<Event> {
    const ret = new Event()

    ret.main_image = event.main_image
    ret.content = event.content
    ret.location = event.location
    ret.latitude = event.latitude
    ret.longitude = event.longitude
    ret.maxParticipant = event.maxParticipant
    ret.curParticipant = event.curParticipant
    ret.host = event.host
    ret.hashtag = event.hashtag
    return await this.eventRepository.save(event)
  }

  async getEventPage(eventId: number, hostId: number): Promise<Event> {
    const event = await this.eventRepository
      .createQueryBuilder('event')
      .innerJoin('event', 'eventId', 'eventId = :id', { id: eventId })
      .innerJoin('event.host', 'host', 'host = :id', { id: hostId })
      .getOne()

    return event
  }

  async eventUpdate(update: EventUpdateDto) {
    try {
      const event = await this.eventRepository
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
          hashtag: update.hashtag,
          modifiedAt: () => 'CURRENT_TIMESTAMP',
        })
        .where('eventId=:id', { id: update.eventId })
        .execute()

      return event
    } catch (err) {
      throw new InternalServerErrorException('dbException')
    }
  }

 async deleteEvent(delete: deleteDto)
}
