import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
} from '@nestjs/swagger'
import { Event } from 'src/entity/Event.entity'

export function DocsGetEventsByHashtag() {
  return (
    applyDecorators(
      ApiOkResponse({
        description: '해시태그 ID를 가진 모든 이벤트를 반환합니다.',
        type: Event,
      }),
      ApiOperation({
        summary: 'hashtagId를 가진 이벤트를 반환합니다.',
        description: 'hashtagId를 가진 이벤트를 반환합니다.',
      }),
      ApiInternalServerErrorResponse({
        description: 'internal server error',
      })
    ),
    ApiParam({
      name: 'hashtagId',
      description: '이벤트가 가진 해시태그의 아이디',
      type: Number,
      required: false,
      example: 1,
    })
  )
}
