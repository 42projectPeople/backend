import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger'
import { Review } from 'src/entity/Review.entity'

export function DocsGetReviewByHostId() {
  return applyDecorators(
    ApiOperation({
      summary: 'get reviews by hostId',
      description: 'get reviews by hostId',
    }),
    ApiOkResponse({
      description: 'Get Success',
      isArray: true,
      type: Review,
    }),
    ApiParam({
      name: 'hostId',
      description: '리뷰를 가져올 호스트의 아이디',
      required: true,
      type: Number,
      example: 1,
    })
  )
}
