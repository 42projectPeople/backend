import { PickType } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import { Event } from 'src/entity/Event.entity'

export class EventCreateDto extends PickType(Event, [
  'eventDate',
  'main_image',
  'content',
  'location',
  'latitude',
  'longitude',
  'header',
  'maxParticipant',
  'hashtag',
]) {}
