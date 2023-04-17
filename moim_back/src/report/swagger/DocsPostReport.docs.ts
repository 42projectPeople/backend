import { applyDecorators } from '@nestjs/common'
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { CreateReportDto } from '../dto/createReport.dto'

export function DocsPostReport() {
  return applyDecorators(
    ApiOperation({
      summary: '신고하기.',
      description:
        "(로그인 없이 reporterId를 현재1로 고정해놨습니다.) \n idToBeReported: eventId, reviewId, userId등 신고하고자 하는 대상의 id, reportType: 유저대상이면 'U', 리뷰 대상이면 'R', 이벤트 대상이면 'E'를 넣습니다. ",
    }),
    ApiCreatedResponse({
      description: '성공적으로 신고했습니다.',
    }),
    ApiInternalServerErrorResponse({
      description: '데이터베이스 서버 에러',
    }),
    ApiBody({
      type: CreateReportDto,
    })
    // ApiBearerAuth('accessToken')
  )
}
