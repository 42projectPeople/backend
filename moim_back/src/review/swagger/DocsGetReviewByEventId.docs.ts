import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger'

export function DocsPGetReviewByEventId() {
  return applyDecorators(
    ApiOperation({
      summary: 'get reviews by eventId',
      description: 'get reviews by event',
    }),
    ApiOkResponse({
      description: 'Get Success',
    })
  )
}
