import { applyDecorators } from '@nestjs/common'
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger'
import CreateReviewDto from '../dto/createReview.dto'

export function DocsPostReview() {
  return applyDecorators(
    ApiOperation({
      summary: 'create new review',
      description: 'create review',
    }),
    ApiCreatedResponse({
      description: 'created',
    }),
    ApiTooManyRequestsResponse({
      description: 'too fast request',
    }),
    ApiInternalServerErrorResponse({
      description: 'internal server error',
    }),
    ApiBody({
      type: CreateReviewDto,
    })
  )
}
