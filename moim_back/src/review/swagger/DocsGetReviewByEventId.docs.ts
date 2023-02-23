import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger'
import ReturnReviews from '../dto/ReturnReview.dto'

export function DocsGetReviewByEventId() {
  return applyDecorators(
    ApiOperation({
      summary: 'get reviews by eventId',
      description: 'get reviews by event',
    }),
    ApiOkResponse({
      description: 'Get Success',
      isArray: true,
      type: ReturnReviews,
    })
  )
}
