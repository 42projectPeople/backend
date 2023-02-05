import { IsNumber } from 'class-validator'

export class EventGetDto {
  @IsNumber()
  eventId: number
  @IsNumber()
  hostId: number
}
