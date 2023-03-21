<<<<<<< HEAD
import { ApiProperty, PickType } from '@nestjs/swagger'
import { Event } from 'src/entity/Event.entity'
import { RolesInEvent } from '../utils/rolesInEvent.enum'

class FindEventDto {
  @ApiProperty({
    description: '이벤트의 고유 아이디',
    example: '1',
  })
  e_eventId: number

  @ApiProperty({
    description: '이벤트가 진행되는 날짜',
    example: '2023-03-08T10:30:15+09:00',
  })
  e_eventDate: Date | string

  @ApiProperty({
    description: '이벤트게시글 생성 시간',
  })
  e_createdAt: Date | string

  @ApiProperty({
    description: '이벤트게시글이 수정된 날짜',
  })
  e_modifiedAt: Date | string

  @ApiProperty({
    description: '이벤트게시글이 삭제된 날짜',
  })
  e_deletedAt: Date | string

  @ApiProperty({
    example: 'false',
    description: '이벤트 게시글 삭제여부',
  })
  e_isDeleted: boolean

  @ApiProperty({
    description: '게시글에 들어간 이미지 URL모음',
    isArray: true,
    example: [
      'https://image-resizef-origin.s3.ap-northeast-2.amazonaws.com/resized/1324123420132123123',
      'https://image-resizef-origin.s3.ap-northeast-2.amazonaws.com/resized/1324123420132123123',
    ],
  })
  e_images: string

  @ApiProperty({
    description: '오픈톡 링크',
    example: 'www.kakaotalk.com',
    nullable: true,
  })
  e_openTalkLink: string

  @ApiProperty({
    description: '상세 설명 문구',
    example: '안녕하세요 moim입니다.',
  })
  e_content: string

  @ApiProperty({
    example: '1',
    description: '이벤트게시글의 조회수',
  })
  e_views: number

  @ApiProperty({
    description: '이벤트가 진행되는 장소',
    example: '서울특별시 강남구 개포로',
  })
  e_location: string

  @ApiProperty({
    description: '상호명',
    nullable: true,
    example: '42서울',
  })
  e_tradeName?: string

  @ApiProperty({
    description: '이벤트가 진행되는 장소의 위도',
    example: '37.48822297429607',
  })
  e_latitude: number

  @ApiProperty({
    description: '이벤트가 진행되는 장소의 경도',
    example: '127.0648014823014',
  })
  e_longitude: number

  e_point: any //not used in create, update dto. only used in raw query in database

  @ApiProperty({
    description: '이벤트 게시글의 메인주제(노출할)',
    example: '테스트 타이틀 1',
  })
  e_header: string

  @ApiProperty({
    description: '이벤트게시글의 총 평점(없앨수도 있음)',
  })
  e_rating: number

  @ApiProperty({
    description: '이벤트에 참가할 수 있는 총 인원',
    example: '4',
  })
  e_maxParticipant: number

  @ApiProperty({
    description: '이벤트에 참가 중인 인원',
    example: '2',
  })
  e_curParticipant: number

  @ApiProperty({
    description: '이벤트게시글 작성자(유저)',
  })
  e_hostId: number

  /*
   * event's hashtag
   * */
  @ApiProperty({
    description: '이벤트게시글의 헤시태그아이디',
  })
  e_hashtagId: number

  @ApiProperty({
    description: '해시태그 아이디',
    example: 1,
  })
  h_hashtagId: number

  @ApiProperty({
    description: '해시태그 이름',
    example: '커피',
  })
  h_hashtagName: string

  @ApiProperty({
    description: 'user id',
  })
  u_userId: number

  @ApiProperty({
    description: 'user name (unique)',
  })
  u_userName: string

  @ApiProperty({
    description: 'user nickname (unique)',
  })
  u_userNickName: string

  @ApiProperty({
    description: 'user role ("admin" || "user")',
  })
  u_userRole: string

  @ApiProperty({
    description: 'profile photo url',
  })
  u_userProfilePhoto: string

  @ApiProperty({
    description: 'user level (float)',
  })
  u_userLevel: number

  @ApiProperty({
    description: 'user title',
  })
  u_userTitle: string
}

=======
import { ApiProperty } from '@nestjs/swagger'
import { Event } from 'src/entity/Event.entity'
import { RolesInEvent } from '../utils/rolesInEvent.enum'

>>>>>>> feat_user
export class ReturnEventDto {
  @ApiProperty({
    examples: ['host', 'guest', 'looker'],
  })
  role: string

  @ApiProperty({
<<<<<<< HEAD
    type: FindEventDto,
    example: FindEventDto,
  })
  readonly event: Event
=======
    type: Event,
    example: Event,
  })
  event: Event
>>>>>>> feat_user

  constructor(event: Event, role: RolesInEvent) {
    this.event = event
    this.role = role
  }
}
