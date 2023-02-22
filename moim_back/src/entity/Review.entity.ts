import { ApiTags } from '@nestjs/swagger'
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
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_Review' })
  reviewId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  modifiedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @Column({
    type: 'enum',
    enum: ['Y', 'N'],
    default: 'N',
  })
  isDeleted: 'Y' | 'N'

  @Column({
    type: 'int',
    default: 0,
  })
  likes: number

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
