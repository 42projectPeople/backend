import { PickType, ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'
import { TransformBooleanInParam } from 'src/search/dto/utils/TransformBooleanInDto'
import { PaginationDto } from './Pagination.dto'

export class GetUserEventDto extends PickType(PaginationDto, [
  'page',
  'pageSize',
] as const) {
  @ApiProperty({
    description: '이벤트 조회순으로 정렬하는가?',
    required: false,
    default: false,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @TransformBooleanInParam()
  private readonly sortByViews?: boolean = false

  @ApiProperty({
    description: '이벤트 시작 날짜로 정렬하는가?',
    required: false,
    default: false,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @TransformBooleanInParam()
  private readonly sortByEventStartDate?: boolean = false

  @ApiProperty({
    description: '종료된 이벤트를 포함하는가?',
    required: false,
    default: false,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @TransformBooleanInParam()
  private readonly includeEndEvent?: boolean = false
}
