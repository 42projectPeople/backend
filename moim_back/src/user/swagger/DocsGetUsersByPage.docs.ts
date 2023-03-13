import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger'
import { Users } from '../utils/Users.type'

export function DocsGetUsersByPage() {
  return applyDecorators(
    ApiOperation({
      summary: 'get users by page',
      description: 'get users by userID. 10 users returned by 1 page',
    }),
    ApiQuery({
      name: 'page',
      description: 'user list page',
    }),
    ApiOkResponse({
      description: '10 User list by page',
      type: Users,
    }),
    ApiBadRequestResponse({
      description: 'bad query',
    })
  )
}
