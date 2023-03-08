import { PickType } from '@nestjs/swagger'
import { Event } from 'src/entity/Event.entity'

export class CreateEventDto extends PickType(Event, [
  'eventDate',
  'main_image',
  'images',
  'content',
  'location',
  'longitude',
  'latitude',
  'header',
  'maxParticipant',
  'hashtag',
  'host',
] as const) {}
