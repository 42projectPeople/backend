import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger'
import { Hashtag } from 'src/entity/Hashtag.entity'

export function DocsGetSearchHashtag() {
  return applyDecorators(
    ApiOperation({
      summary: '해시태그 이름으로 검색합니다.',
      description: '해시태그 이름으로 검색합니다.',
    }),
    ApiOkResponse({
      description: '성공적으로 찾았습니다.',
      isArray: true,
      type: Hashtag,
    }),
    ApiNoContentResponse({
      description: '해당 해시태그가 없습니다.',
      isArray: true,
    })
  )
}
