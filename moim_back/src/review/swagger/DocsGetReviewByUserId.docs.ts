import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger'
import { Review } from 'src/entity/Review.entity'

export function DocsGetReviewByUserId() {
  return applyDecorators(
    ApiOperation({
      summary: 'get reviews by userId',
      description: 'get reviews by user',
    }),
    ApiOkResponse({
      description: 'Get Success',
      type: Review,
    }),
    ApiParam({
      name: 'reviewId',
      description: '리뷰를 요청할 사용자의 아이디',
      required: true,
      type: Number,
      example: 1,
    })
  )
}
