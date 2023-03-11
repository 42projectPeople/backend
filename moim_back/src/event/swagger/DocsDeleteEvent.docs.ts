import { applyDecorators } from '@nestjs/common'
import {
  ApiNoContentResponse,
  ApiParam,
  ApiBearerAuth,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger'

export function DocsDeleteEvent() {
  return applyDecorators(
    ApiBearerAuth('accessToken'),
    ApiOperation({
      description: '이벤트를 삭제합니다.',
    }),
    ApiNotFoundResponse({
      description: '존재하지 않는 자원에 대한 삭제요청',
    }),
    ApiNoContentResponse({
      description: '성공적으로 자원을 삭제했습니다.',
    }),
    ApiParam({
      description: '삭제할 이벤트의 Id',
      name: 'id',
      example: 1,
    })
  )
}
