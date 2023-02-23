import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger'
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
    }),
    ApiParam({
      name: '작성된 리뷰를 요청할 이벤트 아이디',
    }),
    ApiQuery({
      name: 'pagination 정보',
    })
  )
}
