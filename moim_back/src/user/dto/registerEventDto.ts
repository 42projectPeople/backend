import { IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterEventDto {
  @IsNumber()
  @ApiProperty({
    description: 'event id',
  })
  eventId: number
}
