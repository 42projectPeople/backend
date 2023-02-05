import { ApiProduces, ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class EventGetDto {
  @ApiProperty({
    example: '1',
    description: 'event고유 id',
  })
  @IsNumber()
  eventId: number

  @ApiProperty({
    example: '1',
    description: 'event를 생성한 User의 Id',
  })
  @IsNumber()
  hostId: number
}
