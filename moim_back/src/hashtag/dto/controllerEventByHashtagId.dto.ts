import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsNumber } from 'class-validator'

export abstract class controllerEventByHashtagIdDto {
  @ApiProperty({
    description: '요청할 페이지',
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  readonly page: number

  @ApiProperty({
    description: 'view에따른 추천 여부',
    required: false,
    default: false,
  })
  @Type(() => Boolean)
  @IsBoolean()
  readonly recommendation?: boolean

  constructor(page: number, rec: boolean) {
    this.page = page
    this.recommendation = rec ?? false
  }
}
