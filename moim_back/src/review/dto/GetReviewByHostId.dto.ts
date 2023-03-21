import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'
import { TransformBooleanInParam } from 'src/search/dto/utils/TransformBooleanInDto'
import { PaginationDto } from './Pagination.dto'

export class GetReviewByHostIdDto extends PickType(PaginationDto, [
  'page',
  'pageSize',
] as const) {
  @ApiProperty({
    description: '이벤트 날짜 내림차순 정렬(최신기준)',
    example: 'true',
    default: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  @TransformBooleanInParam()
  readonly sortByEventDate: boolean = true

  @ApiProperty({
    description: '이벤트 별점 순 정렬(내림차순)',
    example: 'false',
    default: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  @TransformBooleanInParam()
  readonly sortByEventRating: boolean = false
}
