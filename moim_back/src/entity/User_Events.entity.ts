import {
  Entity,
  ManyToOne,
  JoinColumn,
  Unique,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm'
import { User } from './User.entity'
import { Event } from './Event.entity'

@Entity()
@Unique('unique_UserEvents_userId_eventId_participatedAt', [
  'userId',
  'eventId',
  'participatedAt',
])
export class User_Events {
  @PrimaryGeneratedColumn()
  participentId: number

  @Column({
    type: 'datetime',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  participatedAt: Date

  @Column({
    type: 'datetime',
    default: null,
    nullable: true,
  })
  deletedAt: Date

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isDeleted: boolean

  @ManyToOne(() => User, (user) => user.userId, { nullable: false })
  @JoinColumn({
    name: 'userId',
  })
  userId: User | number

  @ManyToOne(() => Event, (event) => event.eventId, { nullable: false })
  @JoinColumn({
    name: 'eventId',
  })
  eventId: Event | number
}
