import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Event } from 'src/entity/Event.entity'
import { Repository } from 'typeorm'

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>
  ) {}
  async eventFindOneById(eventId: number): Promise<Event> {
    return await this.eventRepository.findOneBy({ eventId })
  }
}
