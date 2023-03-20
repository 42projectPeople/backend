import { ApiProperty } from '@nestjs/swagger'

export class GetCoordinationRequestDto {
  @ApiProperty({
    name: 'address',
    description: '좌표를 검색할 주소명',
  })
  address: string
}
