import { applyDecorators } from '@nestjs/common'
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
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
    })
  )
}
