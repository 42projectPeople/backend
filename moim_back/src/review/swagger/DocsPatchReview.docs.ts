import { applyDecorators } from '@nestjs/common'
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiParam,
  ApiBearerAuth,
  ApiNotFoundResponse,
} from '@nestjs/swagger'

export function DocsPatchReview() {
  return applyDecorators(
    ApiOperation({
      summary: 'update review',
      description: 'update review',
    }),
    ApiBearerAuth('accessToken'),
    ApiUnauthorizedResponse({
      description: '로그인하세요',
    }),
    ApiOkResponse({
      description: 'updated',
    }),
    ApiInternalServerErrorResponse({
      description: 'database server error',
    }),
    ApiNotFoundResponse({
      description: '업데이트하고자 하는 리뷰가 없습니다.',
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
