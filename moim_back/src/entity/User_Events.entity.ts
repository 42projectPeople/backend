import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  Column,
} from 'typeorm'
import { User } from './User.entity'
import { Event } from './Event.entity'

@Entity()
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

  /*
   * @depreciated
   */
  @Column({ name: 'userId' })
  userId: number

  @ManyToOne(() => User, (user) => user.userId, { nullable: false })
  @JoinColumn({
    name: 'userId',
  })
  user: User | number

  /*
   * @depreciated
   */
  @Column({ name: 'eventId' })
  eventId: number

  @ManyToOne(() => Event, (event) => event.participent, { nullable: false })
  @JoinColumn({
    name: 'eventId',
  })
  event: Event | number
}
