import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger'
import { Review } from 'src/entity/Review.entity'

export function DocsGetReviewByEventId() {
  return applyDecorators(
    ApiOperation({
      summary: 'get reviews by eventId',
      description: 'get reviews by event',
    }),
    ApiOkResponse({
      description: 'Get Success',
      isArray: true,
      type: Review,
    }),
    ApiParam({
      name: 'eventId',
      description: '리뷰를 요청할 이벤트의 아이디',
      required: true,
      type: Number,
      example: 1,
    })
  )
}
