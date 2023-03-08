import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger'
import { CreateEventDto } from '../dto/CreateEvent.dto'

export function DocsCreateEvent() {
  return applyDecorators(
    ApiOperation({
      description: '이벤트를 생성합니다.',
    }),
    ApiBody({
      description: '이벤트 생성에 필요한 정보',
      type: CreateEventDto,
    }),
    ApiBearerAuth('accessToken'),
    ApiConflictResponse({
      description: '너무 빠른 이벤트 생성 요청',
    }),
    ApiInternalServerErrorResponse({
      description: '데이터베이스 서버 에러',
    }),
    ApiCreatedResponse({
      description: '생성되었습니다.',
    })
  )
}
