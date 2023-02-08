import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { NotFoundError } from 'rxjs'
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

  async eventFindOneById(eventId: number): Promise<Event> {
    return await this.eventRepository.findOneBy({ eventId })
  }

  async eventCreate(event: EventCreateDto): Promise<any> {
    const tmp_event = new Event()

    tmp_event.eventDate = event.eventDate
    tmp_event.main_image = event.main_image
    tmp_event.content = event.content
    tmp_event.location = event.location
    tmp_event.latitude = event.latitude
    tmp_event.longitude = event.longitude
    tmp_event.header = event.header
    tmp_event.hashtag = event.hashtag
    tmp_event.host = event.host
    tmp_event.maxParticipant = event.maxParticipant
    tmp_event.curParticipant = 0
    tmp_event.rating = 0

    try {
      const ret = await this.eventRepository
        .createQueryBuilder()
        .insert()
        .into(Event)
        .values(tmp_event)
        .execute()
      return ret
    } catch (e) {
      throw new NotFoundException('db injection')
    }
  }

  async eventUpdate(id: number, update: EventUpdateDto) {
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
        maxParticipant: update.maxParticipant,
        hashtag: update.hashtag,
        modifiedAt: () => 'CURRENT_TIMESTAMP',
      })
      .where('eventId = :id', { id: id })
      .execute()
    return event
  }
}
