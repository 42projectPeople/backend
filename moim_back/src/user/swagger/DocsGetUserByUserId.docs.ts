import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger'
import { User } from 'src/entity/User.entity'

export function DocsGetUserByUserId() {
  return applyDecorators(
    ApiOperation({
      summary: 'get user by user id',
      description: 'get user by user id',
    }),
    ApiParam({
      name: 'userID',
      description: 'user id',
    }),
    ApiOkResponse({
      description: 'User information',
      type: User,
    }),
    ApiBadRequestResponse({
      description: 'bad parameter',
    }),
    ApiNoContentResponse({
      description: 'there are no matched content',
    })
  )
}
