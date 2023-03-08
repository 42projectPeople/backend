import { applyDecorators } from '@nestjs/common'
import {
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger'
import { Event } from 'src/entity/Event.entity'

export function DocsGetEvent() {
  return applyDecorators(
    ApiOkResponse({
      description: '성공적으로 요청을 수행했습니다.',
      type: Event,
    }),
    ApiInternalServerErrorResponse({
      description: '데이터베이스 서버 에러',
    }),
    ApiNoContentResponse({
      description: '요청을 수행했으나, 반환할 자원이 없습니다.',
    }),
    ApiParam({
      name: 'id',
      example: 1,
    })
  )
}
