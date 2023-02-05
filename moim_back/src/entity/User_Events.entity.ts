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
  'isDeleted',
])
export class User_Events {
  @PrimaryGeneratedColumn()
  participentId: number

  /*
   * special columns for insertion date
   * */
  @CreateDateColumn()
  participatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @Column({
    default: false,
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
