import { IsNumber } from 'class-validator'

export class eventDeleteDto {
  @IsNumber()
  eventId: number
  @IsNumber()
  hostId: number
}
