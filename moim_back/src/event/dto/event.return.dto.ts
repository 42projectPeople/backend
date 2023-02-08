import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import { appendFile } from 'fs'

export class EventReturnDto {
  @ApiProperty({
    example: 'gulee',
    description: '이벤트페이지에서 보여줘야할 User 닉네임',
  })
  @IsString()
  userNickName: string

  @ApiProperty({
    example: 'URL',
    description: '이벤트페이지에서 보여줘야할 User 프로필이미지 URL',
  })
  @IsString()
  userProfilePhoto: string

  @ApiProperty({
    example: '전 구리입니다.',
    description: '이벤트페이지에서 보여줘야할 User 프로필타이틀',
  })
  @IsString()
  userTitle: string

  @ApiProperty({
    example: 'URL',
    description: '이벤트페이지 상단 메인이미지 URL',
  })
  @IsString()
  main_image: string

  @ApiProperty({
    example: '저녁에 마라탕 먹을분?',
    description: '이벤트페이지 주제',
  })
  @IsString()
  header: string

  @ApiProperty({
    example: 'URL',
    description:
      '이벤트 페이지의 이미지 URLs, 이벤트내용을 저장하고 있는 저장소 URL',
  })
  @IsString()
  content: string

  @ApiProperty({
    example: '999',
    description: '이벤트페이지의 조회수',
  })
  @IsNumber()
  views: number

  @ApiProperty({
    example: '서울시 송파구 xx동 xxx번지',
    description: '이벤트가 진행되는 장소',
  })
  @IsString()
  location: string

  @ApiProperty({
    description: '이벤트가 진행되는 장소의 위도',
  })
  @IsNumber()
  latitude: number

  @ApiProperty({
    description: '이벤트가 진행되는 장소의 경도',
  })
  @IsNumber()
  longitude: number

  @ApiProperty({
    example: '1',
    description: '이벤트에 참여 가능한 총 인원 수',
  })
  @IsNumber()
  maxParticipant: number

  @ApiProperty({
    example: '1',
    description: '이벤트에 현재 참여중인 게스트 인원 수',
  })
  @IsNumber()
  curParticipant: number

  @ApiProperty({
    example: '여행',
    description: '이벤트작성시 추가한 헤시태그네임',
  })
  @IsString()
  hashtagName: string
}
