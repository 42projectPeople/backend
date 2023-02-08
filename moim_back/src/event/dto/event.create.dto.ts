import { PickType } from '@nestjs/swagger'
import { Event } from 'src/entity/Event.entity'

export class EventCreateDto {
  eventDate: string
  main_image: string
  content: string
  location: string
  latitude: number
  longitude: number
  header: string
  maxParticipant: number
  hashtag: number
  host: number

  static transCreateDto(newEvent: EventCreateDto) {
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
