import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger'

export function DocsDeleteReview() {
  return (
    applyDecorators(
      ApiOperation({
        summary: 'delete review',
        description: 'delete review',
      }),
      ApiUnauthorizedResponse({
        description: 'unauthorized',
      }),
      ApiOkResponse({
        description: 'delete success',
      }),
      ApiInternalServerErrorResponse({
        description: 'internal server error',
      }),
      ApiNotFoundResponse({
        description: 'requested review not found',
      })
    ),
    ApiParam({
      name: 'reviewId',
      description: '삭제를 요청할 리뷰의 아이디',
      required: true,
      type: Number,
      example: 1,
    })
  )
}
