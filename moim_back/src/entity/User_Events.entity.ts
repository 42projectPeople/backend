import {
  Entity,
  ManyToOne,
  JoinColumn,
  Unique,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  Column,
} from 'typeorm'
import { User } from './User.entity'
import { Event } from './Event.entity'

@Entity()
@Unique('unique_UserEvents_userId_eventId_deletedAt', [
  'userId',
  'eventId',
  'deletedAt',
])
export class User_Events {
  /**
   * pk
   */
  @PrimaryGeneratedColumn()
  participationId: number

  /*
   * special columns for insertion date
   * */
  @CreateDateColumn()
  participatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

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
