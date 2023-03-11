import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsPositive, IsNumber, IsString, IsByteLength } from 'class-validator'

export default class SearchDto {
  @ApiProperty({
    description: '찾을 단어',
    required: true,
    example: '까',
    minLength: 1,
  })
  @IsString()
  @IsByteLength(1)
  protected readonly word: string

  @ApiProperty({
    description: '요청할 페이지',
    required: true,
    example: 1,
    minimum: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  protected readonly page: number

  @ApiProperty({
    description: 'page 크기',
    default: 5,
    example: 2,
    minimum: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  protected readonly pageSize: number = 5

  getWord(): string {
    return this.word
  }

  getPage(): number {
    return this.page
  }

  getPageSize(): number {
    return this.pageSize
  }

  getStartIndex(): number {
    return (this.page - 1) * this.pageSize
  }
}
