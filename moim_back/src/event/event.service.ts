import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { NotFoundError } from 'rxjs'
import { Event } from 'src/entity/Event.entity'
import { Repository } from 'typeorm'
import { EventCreateDto } from './dto/event.create.dto'

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>
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
}
