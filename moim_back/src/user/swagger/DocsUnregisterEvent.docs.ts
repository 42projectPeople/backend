import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiOkResponse, ApiBody, ApiParam } from '@nestjs/swagger'
import { UnregisterEventRequestDto } from '../dto/unregisterEventRequestDto'

export function DocsUnregisterEvent() {
  return applyDecorators(
    ApiOperation({
      summary: 'unregister event',
      description: 'unregister event',
    }),
    ApiBody({
      type: UnregisterEventRequestDto,
      description: 'event id, participation id in json',
    }),
    ApiParam({
      name: 'userID',
      description: 'user id',
    }),
    ApiOkResponse({
      description: 'success unregister event',
    })
  )
}
