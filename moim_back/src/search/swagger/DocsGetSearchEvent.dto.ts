import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger'
import { Event } from 'src/entity/Event.entity'

export function DocsGetSearchEvent() {
  return applyDecorators(
    ApiOperation({
      summary: '이벤트 이름으로 검색합니다.',
      description: '이벤트 이름으로 검색합니다.',
    }),
    ApiOkResponse({
      description: '성공적으로 찾았습니다.',
      isArray: true,
      type: Event,
    }),
    ApiNoContentResponse({
      description: '해당 이벤트가 없습니다.',
      isArray: true,
    })
  )
}
