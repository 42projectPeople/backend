import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export default class CreateReviewDto {
  @ApiProperty({
    description: 'content 내용',
  })
  @IsString()
  content: string

  @ApiProperty({
    description: '작성자 userId',
  })
  @IsNumber()
  reviewerId: number

  @ApiProperty({
    description: '댓글이 적힌 이벤트의 ID',
  })
  @IsNumber()
  eventId: number
}
