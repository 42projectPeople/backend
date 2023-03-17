import { applyDecorators } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger'
import { ReturnEventDto } from '../dto/ReturnEvent.dto'

export function DocsGetEventByEventId() {
  return applyDecorators(
    ApiOkResponse({
      description: '성공적으로 요청을 수행했습니다.',
      type: ReturnEventDto,
    }),
    ApiBearerAuth('accessToken'),
    ApiInternalServerErrorResponse({
      description: '데이터베이스 서버 에러',
    }),
    ApiNoContentResponse({
      description: '요청을 수행했으나, 반환할 자원이 없습니다.',
    }),
    ApiParam({
      name: 'eventId',
      example: 1,
    })
  )
}
