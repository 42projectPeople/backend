import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import { Review } from 'src/entity/Review.entity'

export default class CreateReviewDto {
  @ApiProperty({
    description: 'content 내용',
  })
  @IsString()
  readonly content: string

  @ApiProperty({
    description: '작성자 userId',
  })
  @IsNumber()
  readonly reviewerId: number

  @ApiProperty({
    description: '댓글이 적힌 이벤트의 ID',
  })
  @IsNumber()
  readonly eventId: number

  /*
   * dto to entity, static
   * */
  static toEntity(createReviewDto: CreateReviewDto): Review {
    const review = new Review()
    review.content = createReviewDto.content
    review.eventId = createReviewDto.eventId
    review.reviewerId = createReviewDto.reviewerId
    return review
  }
}
