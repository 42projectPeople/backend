import { IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UnregisterEventDto {
  @IsNumber()
  @ApiProperty({
    description: 'event id',
  })
  eventId: number

  @IsNumber()
  @ApiProperty({
    description: 'participation id',
  })
  participationId: number
}
