import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger'
import { User } from 'src/entity/User.entity'

export function DocsGetSearchUser() {
  return applyDecorators(
    ApiOperation({
      summary: '사용자 닉네임으로 검색합니다.',
      description: '사용자 닉네임으로 검색합니다.',
    }),
    ApiOkResponse({
      description: '성공적으로 찾았습니다.',
      isArray: true,
      type: User,
    }),
    ApiNoContentResponse({
      description: '해당 단어를 닉네임에 가지는 사용자가 없습니다.',
      isArray: true,
    })
  )
}
