import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Unique,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { Hashtag } from './Hashtag.entity'
import { Review } from './Review.entity'
import { User } from './User.entity'
import { User_Events } from './User_Events.entity'

@Entity()
@Unique('unique_event_createdAt_host', ['createdAt', 'host'])
export class Event {
  @ApiProperty({
    description: '이벤트의 고유 아이디',
    example: '1',
  })
  @IsNumber()
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_Event' })
  eventId: number

  @ApiProperty({
    description: '이벤트가 진행되는 날짜',
    example: 'Wed Mar 08 2023 10:30:00 GMT+0900 (한국 표준시)',
  })
  @IsString()
  @Column()
  eventDate: string

  @ApiProperty({
    description: '이벤트게시글 생성 시간',
  })
  @IsString()
  @CreateDateColumn()
  createdAt: Date | string

  @ApiProperty({
    description: '이벤트게시글이 수정된 날짜',
  })
  @IsString()
  @UpdateDateColumn()
  modifiedAt: Date | string

  @ApiProperty({
    description: '이벤트게시글이 삭제된 날짜',
  })
  @IsString()
  @DeleteDateColumn()
  deletedAt: Date | string

  @ApiProperty({
    example: 'false',
    description: '이벤트 게시글 삭제여부',
  })
  @Column({
    default: false,
  })
  isDelete: boolean

  @ApiProperty({
    description: '이미지 URL모음',
    isArray: true,
    example:
      'https://image-resizef-origin.s3.ap-northeast-2.amazonaws.com/resized/1324123420132123123',
  })
  @ApiProperty({
    example: 'URL',
    description: '이벤트게시글의 메인이미지(주로 노출)',
  })
  @IsString()
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
  @IsString()
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
  @IsNumber()
  @Column({
    type: 'int',
    default: 0,
  })
  views: number

  @ApiProperty({
    description: '이벤트가 진행되는 장소',
    example: '서울특별시 강남구 개포로',
  })
  @IsString()
  @Column({
    type: 'char',
    length: 100,
    nullable: false,
  })
  location: string

  @ApiProperty({
    description: '이벤트가 진행되는 장소의 위도',
    example: '37.48822297429607',
  })
  @Column({
    type: 'float',
    nullable: false,
  })
  latitude: number

  @ApiProperty({
    description: '이벤트가 진행되는 장소의 경도',
    example: '127.0648014823014',
  })
  @Column({
    type: 'float',
    nullable: false,
  })
  longitude: number

  @ApiProperty({
    description: '이벤트 게시글의 메인주제(노출할)',
    example: '테스트 타이틀 1',
  })
  @IsString()
  @Column({
    type: 'char',
    length: 100,
  })
  header: string

  @ApiProperty({
    description: '이벤트게시글의 총 평점(없앨수도 있음)',
  })
  @IsNumber()
  @Column({
    type: 'float',
    default: 0,
  })
  rating: number

  @ApiProperty({
    description: '이벤트에 참가할 수 있는 총 인원',
    example: '4',
  })
  @IsNumber()
  @Column({
    type: 'int',
  })
  maxParticipant: number

  @ApiProperty({
    description: '이벤트에 참가 중인 인원',
    example: '2',
  })
  @IsNumber()
  @Column({
    type: 'int',
  })
  curParticipant: number

  @ApiProperty({
    description: '이벤트게시글 작성자(유저)',
    example: 1,
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
  @ManyToOne(() => Hashtag, (hashtag) => hashtag.hashtagId)
  @JoinColumn({
    name: 'hashtagId',
  })
  hashtag: Hashtag | number

  @OneToMany(() => Review, (review) => review.eventId)
  reviewIds: Review[]
}
