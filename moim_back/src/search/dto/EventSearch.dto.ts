import SearchDto from './utils/Search.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'
import { TransformBooleanInParam } from './utils/TransformBooleanInDto'

export class EventSearchDto extends SearchDto {
  @ApiProperty({
    description: '이벤트 조회순으로 정렬하는가?',
    required: false,
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @TransformBooleanInParam()
  private readonly sortByViews?: boolean = false

  @ApiProperty({
    description: '정원이 다 찬 이벤트도 포함하는가?',
    required: false,
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @TransformBooleanInParam()
  private readonly includeMax?: boolean = false

  @ApiProperty({
    description: 'rating순으로 정렬하는가?',
    required: false,
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @TransformBooleanInParam()
  private readonly sortByRating?: boolean = false

  @ApiProperty({
    description: '(적용x)현재위치 기준으로 정렬하는가?',
    required: false,
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @TransformBooleanInParam()
  private readonly sortByLocation?: boolean = false

  getSortByViews(): boolean {
    return this.sortByViews
  }

  getIncludeMax(): boolean {
    return this.includeMax
  }

  getSortByRating(): boolean {
    return this.sortByRating
  }

  getSortByLocation(): boolean {
    return this.sortByLocation
  }
}
