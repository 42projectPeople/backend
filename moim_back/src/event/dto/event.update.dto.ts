import { PickType } from '@nestjs/swagger'
import { Event } from 'src/entity/Event.entity'

export class EventUpdateDto extends PickType(Event, []) {
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
}
