import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsPositive } from 'class-validator'

export class PaginationDto {
  @ApiProperty({
    description: '요청할 페이지',
    required: true,
    example: 'https://host/review/event/2?page=10',
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  readonly page: number

  @ApiProperty({
    description: 'page 크기',
    example: 'https://host/review/user/2?page=10&pageSize=2',
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  readonly pageSize: number
}
