import { ApiProperty } from '@nestjs/swagger'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm'
import { Hashtag } from './Hashtag.entity'
import { Review } from './Review.entity'
import { User } from './User.entity'
import { User_Events } from './User_Events.entity'

@Entity()
@Unique('unique_event_createdAt_host', ['createdAt', 'host'])
export class Event {
  @ApiProperty({
    example: '1',
    description: '이벤트의 고유 아이디',
  })
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_Event' })
  eventId: number

  @ApiProperty({
    description: '이벤트게시글 생성 시간',
  })
  @Column({
    type: 'datetime',
    precision: 6,
    nullable: false,
  })
  createdAt: string

  @ApiProperty({
    description: '이벤트가 진행되는 날짜',
  })
  @Column({
    type: 'datetime',
    nullable: false,
  })
  eventDate: string

  @ApiProperty({
    description: '이벤트게시글이 수정된 날짜',
  })
  @Column({
    type: 'datetime',
    nullable: true,
  })
  modifiedAt: string

  @ApiProperty({
    example: 'URL',
    description: '이벤트게시글의 메인이미지(주로 노출)',
  })
  @Column({
    type: 'char',
    length: '100',
    nullable: true,
    comment: 'URL',
  })
  main_image: string

  @ApiProperty({
    example: 'URL',
    description:
      '이벤트의 이미지URL들과, 상세설명 내용을 담고 있는 S3저장소 URL',
  })
  @Column({
    type: 'char',
    length: 100,
    nullable: false,
    comment: 'URL',
  })
  content: string

  @ApiProperty({
    example: '1',
    description: '이벤트게시글의 조회수',
  })
  @Column({
    type: 'int',
    default: 0,
  })
  views: number

  @ApiProperty({
    description: '이벤트가 진행되는 장소',
  })
  @Column({
    type: 'char',
    length: 100,
    nullable: false,
  })
  location: string

  @ApiProperty({
    description: '이벤트가 진행되는 장소의 위도',
  })
  @Column({
    type: 'float',
    nullable: false,
  })
  latitude: number

  @ApiProperty({
    description: '이벤트가 진행되는 장소의 경도',
  })
  @Column({
    type: 'float',
    nullable: false,
  })
  longitude: number

  @ApiProperty({
    description: '이벤트 게시글의 메인주제(노출할)',
  })
  @Column({
    type: 'char',
    length: 100,
  })
  header: string

  @ApiProperty({
    description: '이벤트게시글의 총 평점(없앨수도 있음)',
  })
  @Column({
    type: 'float',
    default: 0,
  })
  rating: number

  @ApiProperty({
    description: '이벤트에 참가할 수 있는 총 인원',
  })
  @Column({
    type: 'int',
  })
  maxParticipant: number

  @ApiProperty({
    description: '이벤트에 참가 중인 인원',
  })
  @Column({
    type: 'int',
  })
  curParticipant: number

  @ApiProperty({
    description: '이벤트게시글 작성자(유저)',
  })
  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({
    name: 'hostId',
  })
  host: User | number

  @ApiProperty({
    description: '이벤트에 참가중인 유저(?)',
  })
  @OneToMany(() => User_Events, (ue) => ue.eventId)
  participent: User_Events[]

  /*
   * event's hashtag
   * */
  @ApiProperty({
    description: '이벤트게시글의 헤시태그아이디',
  })
  @ManyToOne(() => Hashtag, (hashtag) => hashtag.event)
  @JoinColumn({
    name: 'hashtagId',
  })
  hashtag: Hashtag | number

  @OneToMany(() => Review, (review) => review.reviewId)
  reviewIds: Review[]
}
