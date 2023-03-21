import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger'
import { User } from 'src/entity/User.entity'

export function DocsGetUserByNickName() {
  return applyDecorators(
    ApiOperation({
      summary: 'get user by nickname',
      description: 'get user by nickname',
    }),
    ApiParam({
      name: 'user nick name',
      description: 'user nickname',
    }),
    ApiOkResponse({
      description: 'get user by nickname',
      type: User,
    }),
    ApiNoContentResponse({
      description: 'there are no user matched',
    })
  )
}
