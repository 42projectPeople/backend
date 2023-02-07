import { ApiProperty } from '@nestjs/swagger'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
  Unique,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { Hashtag } from './Hashtag.entity'
import { Review } from './Review.entity'
import { User } from './User.entity'

@Entity()
@Unique('unique_event_createdAt_host', ['createdAt', 'host'])
export class Event {
  @ApiProperty({
    example: '1',
    description: 'event의 id',
  })
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_Event' })
  eventId: number

  @ApiProperty({
    description: 'event 생성시간',
  })
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty({
    description: 'event 삭제시간',
  })
  @DeleteDateColumn()
  deleteAt: Date

  @ApiProperty({
    description: 'event의 수정시간',
  })
  @UpdateDateColumn()
  modifiedAt: Date

  @ApiProperty({
    description: 'event가 진행되는 시간',
  })
  @Column({
    type: 'char',
    length: '100',
  })
  eventDate: string | null

  @ApiProperty({
    example: 'URL',
    description: 'event의 메인 이미지를 저장하고 있는 저장소 주소',
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
    description: 'event의 이미지들의 URL과 세부내용이 있는 저장소 주소',
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
    description: 'event의 조회수',
  })
  @Column({
    type: 'int',
    default: 0,
  })
  views: number

  @ApiProperty({
    example: '서울시 송파구 올림픽로',
    description: 'event가 진행되는 장소',
  })
  @Column({
    type: 'char',
    length: 100,
    nullable: true,
  })
  location: string

  @ApiProperty({
    example: '-0.1',
    description: 'event가 진행되는 장소의 위도',
  })
  @Column({
    type: 'float',
    nullable: true,
  })
  latitude: number

  @ApiProperty({
    example: '-0.1',
    description: 'event가 진행되는 장소의 경도',
  })
  @Column({
    type: 'float',
    nullable: true,
  })
  longitude: number

  @ApiProperty({
    example: '42에서 밥먹으실 뮤캉구함',
    description: 'event게시글의 주제',
  })
  @Column({
    type: 'char',
    length: 100,
  })
  header: string

  @ApiProperty({
    example: '1.1',
    description: 'Event 총평',
  })
  @Column({
    type: 'float',
    default: 0,
  })
  rating: number

  @ApiProperty({
    example: '5',
    description: 'Event에 참가할 수 있는 총 게스트인원',
  })
  @Column({
    type: 'int',
  })
  maxParticipant: number

  @ApiProperty({
    example: '2',
    description: 'event에 참가중인 게스트인원',
  })
  @Column({
    type: 'int',
    default: 0,
  })
  curParticipant: number

  @ApiProperty({
    example: '1',
    description: 'event게시글 작성자',
  })
  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({
    name: 'hostId',
  })
  host: User | number

  @ApiProperty({
    example: '1',
    description: 'User_Event테이블의 id',
  })
  @ManyToMany(() => User, (user) => user.enrollEvents)
  enrollUsers: User[]

  /*
   * event's hashtag
   * */
  @ApiProperty({
    example: '1',
    description: 'event게시글에 설정된 hashtag아이디',
  })
  @ManyToOne(() => Hashtag, (hashtag) => hashtag.event)
  @JoinColumn({
    name: 'hashtagId',
  })
  hashtag: Hashtag | number

  @ApiProperty({
    description: '해당 Event의 후기목록',
  })
  @OneToMany(() => Review, (review) => review.reviewId)
  reviewIds: Review[]
}
