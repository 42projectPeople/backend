import { IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UnregisterEventRequestDto {
  @IsNumber()
  @ApiProperty({
    description: 'event id',
  })
  readonly eventId: number

  @IsNumber()
  @ApiProperty({
    description: 'participation id',
  })
  readonly participationId: number
}
