import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class EventUpdateDto {
  @ApiProperty({
    description: 'event의 메인 이미지 URL',
  })
  @IsString()
  main_image: string

  @ApiProperty({
    description: 'event의 이미지들의 URL과 세부내용의 자료를 담고 있는 URL',
  })
  @IsString()
  content: string

  @IsString()
  eventDate: string

  @ApiProperty({
    description: 'event가 진행이 되는 주소',
  })
  @IsString()
  location: string

  @ApiProperty({
    description: 'event가 진행되는 주소의 위도',
  })
  @IsNumber()
  latitude: number

  @ApiProperty({
    description: 'event가 진행되는 주소의 경도',
  })
  @IsNumber()
  longitude: number

  @ApiProperty({
    description: 'event의 메인주제 title이라고 볼 수 있다',
  })
  @IsString()
  header: string

  @ApiProperty({
    description: 'event에 참가할 수 있는 참가자 수',
  })
  @IsNumber()
  maxParticipant: number

  @ApiProperty({
    description: '현재 event에 참가중인 참가자 수',
  })
  @IsNumber()
  curParticipant: number

  @ApiProperty({
    description: 'event의 hostId',
  })
  @IsNumber()
  host: number

  @ApiProperty({
    description: 'event의 hashtagId',
  })
  @IsNumber()
  hashtag: number
}
