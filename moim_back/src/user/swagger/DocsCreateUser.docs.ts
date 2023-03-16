import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiConflictResponse,
} from '@nestjs/swagger'
import { CreateUserRequestDto } from '../dto/createUserRequestDto'

export function DocsCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'user creation api', description: 'create user' }),
    ApiCreatedResponse({
      description: 'create user operation success',
    }),
    ApiConflictResponse({
      description: 'create user operation is failed by conflict request',
    }),
    ApiBody({
      type: CreateUserRequestDto,
      description: 'Create user data',
    })
  )
}
