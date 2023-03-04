import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsPositive, IsNumber, IsString } from 'class-validator'

export default class SearchDto {
  @ApiProperty({
    description: '찾을 단어',
    required: true,
    example: '까',
  })
  @IsString()
  protected readonly word: string

  @ApiProperty({
    description: '요청할 페이지',
    required: true,
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  protected readonly page: number

  @ApiProperty({
    description: 'page 크기',
    default: 5,
    example: 2,
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  protected readonly pageSize: number = 5
}
