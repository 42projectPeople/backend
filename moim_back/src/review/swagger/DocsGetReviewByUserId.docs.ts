import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger'
import ReturnReviews from '../dto/ReturnReview.dto'

export function DocsGetReviewByUserId() {
  return applyDecorators(
    ApiOperation({
      summary: 'get reviews by userId',
      description: 'get reviews by user',
    }),
    ApiOkResponse({
      description: 'Get Success',
      type: ReturnReviews,
    })
  )
}
