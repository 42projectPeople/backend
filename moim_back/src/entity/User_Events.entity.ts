import {
  Entity,
  ManyToOne,
  JoinColumn,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User.entity'
import { Event } from './Event.entity'

@Entity()
@Unique('unique_UserEvents_user_eventId', ['userId', 'eventId'])
export class User_Events {
  @PrimaryGeneratedColumn()
  participentId: number

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
