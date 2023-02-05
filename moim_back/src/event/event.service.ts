import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Event } from 'src/entity/Event.entity'
import { User } from 'src/entity/User.entity'
import { Repository } from 'typeorm'
import { CreateEventDto } from './dto/event.create.dto'

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
}
