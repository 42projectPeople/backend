import SearchDto from './utils/Search.dto'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator'
import { TransformBooleanInParam } from './utils/TransformBooleanInDto'
import { Transform, Type } from 'class-transformer'

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
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @TransformBooleanInParam()
  private readonly includeMax?: boolean = false

  @ApiProperty({
    description: 'rating순으로 정렬하는가?',
    required: false,
    default: false,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @TransformBooleanInParam()
  private readonly sortByRating?: boolean = false

  @ApiProperty({
    description: '(적용x)몇 km이내 이벤트를 검색하는가?',
    required: false,
    default: null,
    example: null,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  private readonly locRange?: number = null

  @ApiProperty({
    description: '사용자의 현재 위치 위도',
    required: false,
    default: null,
    example: null,
  })
  @IsOptional()
  @IsLatitude()
  private readonly latitude?: number = null

  @ApiProperty({
    description: '사용자의 현재 위치 경도',
    required: false,
    default: null,
    example: null,
  })
  @IsOptional()
  @IsLongitude()
  private readonly longitude?: number = null

  getSortByViews(): boolean {
    return this.sortByViews
  }

  getIncludeMax(): boolean {
    return this.includeMax
  }

  getSortByRating(): boolean {
    return this.sortByRating
  }

  getLocRange(): number {
    return this.locRange
  }

  getLongitude(): number {
    return this.longitude === null ? 127.06484106521656 : this.longitude
  }

  getLatitude(): number {
    return this.latitude === null ? 37.48823196265643 : this.latitude
  }
}
