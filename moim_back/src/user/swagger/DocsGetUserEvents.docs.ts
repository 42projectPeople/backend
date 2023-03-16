import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger'
import { EventData } from '../utils/EventData'

export function DocsGetUserEvents() {
  return applyDecorators(
    ApiOperation({
      summary: 'get user events',
      description: 'get user register or hosted events.',
    }),
    ApiQuery({
      name: 'role',
      description: 'user role in event. (host || guest)',
    }),
    ApiParam({
      name: 'userID',
      description: 'user id',
    }),
    ApiOkResponse({
      type: EventData,
      description: 'user events',
    }),
    ApiBadRequestResponse({
      description: 'bad request query',
    })
  )
}
