import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class eventDeleteDto {
  @ApiProperty({
    example: '1',
    description: '삭제할 event아이디',
  })
  @IsNumber()
  eventId: number
  @ApiProperty({
    example: '1',
    description: '삭제할 event의 작성자 아이디',
  })
  @IsNumber()
  hostId: number
}
