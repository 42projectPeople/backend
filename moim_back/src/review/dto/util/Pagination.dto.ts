import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsPositive } from 'class-validator'

export class PaginationDtoMeta {
  @ApiProperty({
    description: '요청할 페이지',
    required: true,
    examples: [
      'https://damoimapp.com/review/event/2?page=10&',
      'https://damoimapp.com/review/user/2?page=10&',
    ],
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  private readonly page: number

  @ApiProperty({
    description: 'page 크기',
    required: false,
    default: 10,
    examples: [
      'https://damoimapp.com/review/user/2?page=10&pageSize=2',
      'https://damoimapp.com/review/review/2?page=10&pageSize=2',
    ],
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  private readonly pageSize?: number

  getStartIndex(): number {
    return this.page * this.pageSize
  }

  getPageSize(): number {
    return this.pageSize
  }

  getPage(): number {
    return this.page
  }
}
