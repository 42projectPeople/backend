import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Unique,
} from 'typeorm'
import { Event } from './Event.entity'
import { User } from './User.entity'

@Entity()
@Unique('unique_Review_createdAt_reviewerId', ['createdAt', 'reviewerId'])
export class Review {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_Review' })
  reviewId: number

  @Column({
    type: 'datetime',
    precision: 6,
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string

  @Column({
    type: 'datetime',
    precision: 1,
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  modifiedAt: string

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

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  deleted: boolean

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
