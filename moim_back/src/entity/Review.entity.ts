import { ApiProperty, ApiTags } from '@nestjs/swagger'
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Unique,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { Event } from './Event.entity'
import { User } from './User.entity'

@Entity()
@ApiTags('review api')
@Unique('unique_Review_createdAt_reviewerId', ['createdAt', 'reviewerId'])
export class Review {
  @ApiProperty({
    description: '리뷰의 아이디',
    example: 1,
  })
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_Review' })
  reviewId: number

  @ApiProperty({
    description: '생성날짜',
    example: '2023-02-03 03:29:22.350000',
  })
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty({
    description: '수정날짜',
    example: '2023-02-11 19:37:41.845766',
  })
  @UpdateDateColumn()
  modifiedAt: Date

  @ApiProperty({
    description: '삭제날짜',
    example: '2023-02-14 19:37:41.845766',
  })
  @DeleteDateColumn()
  deletedAt: Date

  @ApiProperty({
    description: '삭제 유무',
    example: 'N',
  })
  @Column({
    type: 'enum',
    enum: ['Y', 'N'],
    default: 'N',
  })
  isDeleted: 'Y' | 'N'

  @ApiProperty({
    description: '좋아요 수',
    example: '5',
  })
  @Column({
    type: 'int',
    default: 0,
  })
  likes: number

  @ApiProperty({
    description: '리뷰 내용',
    example: '좋아용 너무 재밌어용',
  })
  @Column({
    type: 'varchar',
    length: 400,
    nullable: false,
  })
  content: string

  /*
   * userId
   * */
  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({
    name: 'reviewerId',
  })
  reviewerId: User | number

  /*
   * referencing event
   * */
  @ManyToOne(() => Event, (event) => event.eventId)
  @JoinColumn({
    name: 'eventId',
  })
  eventId: Event | number
}
