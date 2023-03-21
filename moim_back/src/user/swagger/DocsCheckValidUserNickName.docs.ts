import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger'
import { CheckNickNameResponseDto } from '../dto/checkNickNameResponseDto'

export function DocscheckValidUserNickName() {
  return applyDecorators(
    ApiOperation({
      summary: 'check user nickname is valid',
      description: 'validate user nickname',
    }),
    ApiOkResponse({
      description: 'check valid nickname',
      type: CheckNickNameResponseDto,
    })
  )
}
