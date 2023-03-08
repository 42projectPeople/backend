import { applyDecorators } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger'
import { UpdateEventDto } from '../dto/UpdateEvent.dto'

export function DocsUpdateEvent() {
  return applyDecorators(
    ApiBearerAuth('accessToken'),
    ApiOperation({
      description: '존재하는 이벤트를 수정합니다.',
    }),
    ApiParam({
      name: 'id',
      description: '업데이트할 이벤트의 id',
      example: 1,
    }),
    ApiBody({
      description: '수정할 이벤트 정보(부분적인 정보)',
      type: UpdateEventDto,
    }),
    ApiInternalServerErrorResponse({
      description: '데이터베이스 서버 에러',
    }),
    ApiNotFoundResponse({
      description: '존재하지 않는 자원에 대한 수정요청',
    })
  )
}
