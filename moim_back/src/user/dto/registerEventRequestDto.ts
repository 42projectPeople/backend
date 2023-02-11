import { IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterEventRequestDto {
  @IsNumber()
  @ApiProperty({
    description: 'event id',
  })
  eventId: number
}
