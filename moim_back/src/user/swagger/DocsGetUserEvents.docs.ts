import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { EventData } from '../utils/EventData'

export function DocsGetUserEvents() {
  return applyDecorators(
    ApiOperation({
      summary: 'get user events',
      description: 'get user register or hosted events.',
    }),
    ApiBearerAuth('accessToken'),
    ApiParam({
      name: 'userId',
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
