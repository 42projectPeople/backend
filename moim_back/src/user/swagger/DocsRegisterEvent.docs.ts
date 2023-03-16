import { applyDecorators } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger'
import { RegisterEventRequestDto } from '../dto/registerEventRequestDto'

export function DocsRegisterEvent() {
  return applyDecorators(
    ApiOperation({
      summary: 'register event',
      description: 'register event',
    }),
    ApiBody({
      type: RegisterEventRequestDto,
      description: 'event id in json',
    }),
    ApiParam({
      name: 'userID',
      description: 'user id',
    }),
    ApiCreatedResponse({
      description: 'success register event',
    })
  )
}
