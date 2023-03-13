import { applyDecorators } from '@nestjs/common'
import { UpdateUserRequestDto } from '../dto/updateUserRequestDto'
import {
  ApiBody,
  ApiParam,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger'

export function DocsUpdateUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'update user',
      description: 'update user',
    }),
    ApiParam({
      name: 'user id',
      description: 'user id',
    }),
    ApiBody({
      type: UpdateUserRequestDto,
      description: 'data that user want to update',
    }),
    ApiOkResponse({
      description: 'success update user',
    }),
    ApiBadRequestResponse({
      description: 'invalid parameter',
    })
  )
}
