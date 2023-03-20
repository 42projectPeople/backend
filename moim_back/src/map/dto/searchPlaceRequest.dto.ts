import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class SearchPlaceRequestDto {
  @ApiProperty({
    name: 'keyword',
    description: ' 검색할 장소 명',
  })
  @IsString()
  keyword: string
}
