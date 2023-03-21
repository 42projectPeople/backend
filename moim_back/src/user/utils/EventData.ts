import { Event } from '../../entity/Event.entity'
import { ApiProperty } from '@nestjs/swagger'
export class EventData {
  @ApiProperty({
    description: 'Event list',
    isArray: true,
    type: Event,
  })
  events: Event[]
}
