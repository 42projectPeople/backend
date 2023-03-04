import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger'
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
    })
  )
}
