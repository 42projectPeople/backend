import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional } from 'class-validator'

export class controllerEventByHashtagIdDto {
  @ApiProperty({
    description: '요청할 페이지',
    required: true,
    example:
      'https://damoimapp.com/hashtag/events/2?page=10&recommendation=true',
  })
  @Type(() => Number)
  @IsNumber()
  readonly page: number

  @ApiProperty({
    description: 'view에따른 추천 여부',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean() //https://github.com/typestack/class-transformer/issues/626#issuecomment-1125527201
  @Transform(({ value }) => {
    if (value === 'true') return true
    if (value === 'false') return false
  })
  readonly recommendation?: boolean

  @ApiProperty({
    description: 'page 크기',
    required: false,
    default: 10,
    example: 'https://damoimapp.com/hashtag/events/2?page=10&pageSize=2',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly pageSize?: number
}
