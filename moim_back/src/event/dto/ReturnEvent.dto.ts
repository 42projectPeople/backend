import { ApiProperty } from '@nestjs/swagger'
import { Event } from 'src/entity/Event.entity'
import { RolesInEvent } from '../utils/rolesInEvent.enum'

export class ReturnEventDto {
  @ApiProperty({
    examples: ['host', 'guest', 'looker'],
  })
  role: string

  @ApiProperty({
    type: Event,
    example: Event,
  })
  event: Event

  constructor(event: Event, role: RolesInEvent) {
    this.event = event
    this.role = role
  }
}
