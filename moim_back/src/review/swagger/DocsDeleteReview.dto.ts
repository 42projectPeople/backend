import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'

export function DocsDeleteReview() {
  return applyDecorators(
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
  )
}
