import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { env } from 'process'
import { NotFoundError } from 'rxjs'
import { Event } from 'src/entity/Event.entity'
import { Hashtag } from 'src/entity/Hashtag.entity'
import { User } from 'src/entity/User.entity'
import { Repository } from 'typeorm'
import { EventCreateDto } from './dto/event.create.dto'
import { EventReturnDto } from './dto/event.return.dto'
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

  async eventCreate(newEvent: EventCreateDto): Promise<EventReturnDto> {
    try {
      const createEvent = this.transCreateDto(newEvent)
      const event = await this.eventRepository.save(createEvent)
      const user = await this.userRepository
        .createQueryBuilder()
        .innerJoin('user', 'user')
        .where('user.userId=:userId', { userId: event.host })
        .getOne()
      const hashtag = await this.hashtagRepository
        .createQueryBuilder()
        .innerJoin('hashtag', 'h')
        .where('h.hashtagId=:hashtag', { hashtag: event.hashtag })
        .getOne()
      const returnDto = await this.transReturnDto(user, event, hashtag)

      return returnDto
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

  transReturnDto(user: User, event: Event, hashtag: Hashtag) {
    const returnDto = new EventReturnDto()

    returnDto.userNickName = user.userNickName
    returnDto.userProfilePhoto = user.userProfilePhoto
    returnDto.userTitle = user.userTitle
    returnDto.hashtagName = hashtag.hashtagName
    returnDto.main_image = event.main_image
    returnDto.header = event.header
    returnDto.content = event.content
    returnDto.views = event.views
    returnDto.location = event.location
    returnDto.latitude = event.latitude
    returnDto.longitude = event.longitude
    returnDto.maxParticipant = event.maxParticipant
    returnDto.curParticipant = event.curParticipant

    return returnDto
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
