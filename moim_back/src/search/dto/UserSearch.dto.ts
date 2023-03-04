import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'
import SearchDto from './utils/Search.dto'
import { TransformBooleanInParam } from './utils/TransformBooleanInDto'

export class UserSearchDto extends SearchDto {
  @ApiProperty({
    description: '사용자 레벨별로 정렬하는가?',
    required: false,
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @TransformBooleanInParam()
  private readonly sortByLevel?: boolean = false

  @ApiProperty({
    description: '사용자 이름별로 정렬하는가?',
    required: false,
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @TransformBooleanInParam()
  private readonly sortByName?: boolean = false
}
