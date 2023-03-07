import { applyDecorators } from '@nestjs/common'
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiParam,
} from '@nestjs/swagger'

export function DocsPatchReview() {
  return applyDecorators(
    ApiOperation({
      summary: 'update review',
      description: 'update review',
    }),
    ApiUnauthorizedResponse({
      description: 'unauthorized',
    }),
    ApiOkResponse({
      description: 'updated',
    }),
    ApiInternalServerErrorResponse({
      description: 'database server error',
    }),
    ApiParam({
      name: 'reviewId',
      description: '수정을 요청할 리뷰의 아이디',
      required: true,
      type: Number,
      example: 1,
    })
  )
}
