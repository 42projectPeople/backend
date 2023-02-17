import { IsISBN, IsNumber, IsString } from 'class-validator'
import { Event } from 'src/entity/Event.entity'

export class EventDefaultDto {
  @IsString()
  eventDate: string
  @IsString()
  main_image: string
  @IsString()
  content: string
  @IsString()
  location: string
  @IsNumber()
  latitude: number
  @IsNumber()
  longitude: number
  @IsString()
  header: string
  @IsNumber()
  maxParticipant: number
  @IsNumber()
  hashtag: number
  @IsNumber()
  host: number

  static transEventDto(newEvent: EventDefaultDto) {
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
