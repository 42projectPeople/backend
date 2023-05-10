import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  ValidationError,
} from 'class-validator'

export class controllerEventByHashtagIdDto {
  @ApiProperty({
    description: '요청할 페이지',
    required: true,
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  readonly page: number

  @ApiProperty({
    description: '날짜순에 따른 정렬 여부',
    required: true,
    default: true,
  })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true
    if (value === 'false') return false
    return new ValidationError()
  })
  readonly sortByDate?: boolean = true

  @ApiProperty({
    description: 'view 수에따른 추천 여부, true면 view 순서대로',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean() //https://github.com/typestack/class-transformer/issues/626#issuecomment-1125527201
  @Transform(({ value }) => {
    if (value === 'true') return true
    if (value === 'false') return false
    return new ValidationError()
  })
  readonly recommendation?: boolean = false

  @ApiProperty({
    description: 'page 크기',
    required: false,
    default: 5,
    example: 2,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly pageSize?: number = 5
}
