import { ApiProperty, ApiTags } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsInt,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator'
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
  Index,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import { Hashtag } from './Hashtag.entity'
import { Review } from './Review.entity'
import { User } from './User.entity'
import { User_Events } from './User_Events.entity'

@ApiTags('event api')
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
    example: '2023-03-08T10:30:15+09:00',
  })
  @IsISO8601()
  @Column({
    type: 'datetime',
  })
  eventDate: Date | string

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
  isDeleted: boolean

  @ApiProperty({
    description: '게시글에 들어간 이미지 URL모음',
    isArray: true,
    example: [
      'https://image-resizef-origin.s3.ap-northeast-2.amazonaws.com/resized/1324123420132123123',
      'https://image-resizef-origin.s3.ap-northeast-2.amazonaws.com/resized/1324123420132123123',
    ],
  })
  @IsOptional()
  @Transform(({ value }) => {
    return value.join(' ')
  })
  @IsString()
  @Column({
    type: 'text',
    nullable: true,
    comment: 'URL array',
  })
  images?: string

  @ApiProperty({
    description: '오픈톡 링크',
    example: 'www.kakaotalk.com',
    nullable: true,
  })
  @IsOptional()
  @Column({
    type: 'char',
    length: 150,
    comment: 'URL',
    nullable: true,
  })
  openTalkLink?: string

  @ApiProperty({
    description: '상세 설명 문구',
    example: '안녕하세요 moim입니다.',
  })
  @IsString()
  @Column({
    type: 'text',
    nullable: false,
    comment: 'string',
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
    description: '상호명',
    nullable: true,
    example: '42서울',
  })
  @Column({
    type: 'char',
    length: 50,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  tradeName?: string

  @ApiProperty({
    description: '이벤트가 진행되는 장소의 위도',
    example: '37.48822297429607',
  })
  @Column({
    type: 'decimal',
    precision: 11,
    scale: 8,
    nullable: false,
  })
  @IsNumber()
  latitude: number

  @ApiProperty({
    description: '이벤트가 진행되는 장소의 경도',
    example: '127.0648014823014',
  })
  @Column({
    type: 'decimal',
    precision: 11,
    scale: 8,
    nullable: false,
  })
  @IsNumber()
  longitude: number

  @Column({
    type: 'geometry',
    nullable: false,
  })
  @Index({
    //set spatial index
    spatial: true,
  })
  point: any //not used in create, update dto. only used in raw query in database

  @BeforeInsert()
  setGeom() {
    if (this.latitude && this.longitude) {
      this.point = () =>
        `ST_PointFromText(CONCAT('POINT(', ${this.longitude}, ' ', ${this.latitude}, ')'))`
    }
  }

  @BeforeUpdate()
  setUpdateGeom() {
    if (this.latitude && this.longitude) {
      this.point = () =>
        `ST_PointFromText(CONCAT('POINT(', ${this.longitude}, ' ', ${this.latitude}, ')'))`
    }
  }

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
  @IsInt()
  @IsPositive()
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
    default: 0,
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

  @OneToMany(() => User_Events, (ue) => ue.event, { cascade: true })
  participent: User_Events[]

  /*
   * event's hashtag
   * */
  @ApiProperty({
    description: '이벤트게시글의 헤시태그아이디',
    example: Hashtag,
  })
  @IsInt()
  @IsPositive()
  @ManyToOne(() => Hashtag, (hashtag) => hashtag.hashtagId)
  @JoinColumn({
    name: 'hashtagId',
  })
  hashtag: Hashtag | number

  @OneToMany(() => Review, (review) => review.eventId)
  reviewIds: Review[]
}
