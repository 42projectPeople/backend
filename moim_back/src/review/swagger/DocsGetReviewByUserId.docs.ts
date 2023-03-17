import { applyDecorators } from '@nestjs/common'
<<<<<<< HEAD
import { ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger'
=======
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger'
>>>>>>> 9171845 (docs(return dto): review entity example추가해서 해결)
import { Review } from 'src/entity/Review.entity'

export function DocsGetReviewByUserId() {
  return applyDecorators(
    ApiOperation({
      summary: 'get reviews by userId',
      description: 'get reviews by user',
    }),
    ApiOkResponse({
      description: 'Get Success',
      type: Review,
<<<<<<< HEAD
    }),
    ApiParam({
      name: 'userId',
      description: '리뷰를 요청할 사용자의 아이디',
      required: true,
      type: Number,
      example: 1,
=======
>>>>>>> 9171845 (docs(return dto): review entity example추가해서 해결)
    })
  )
}
