import { PickType } from '@nestjs/swagger'
import { Event } from 'src/entity/Event.entity'

export class CreateEventDto extends PickType(Event, [
  'eventDate',
  'images',
  'openTalkLink',
  'content',
  'location',
  'tradeName',
  'longitude',
  'latitude',
  'header',
  'maxParticipant',
  'hashtag',
] as const) {}
