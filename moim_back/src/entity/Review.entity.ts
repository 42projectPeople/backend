import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Event } from './Event.entity';
import { User } from './User.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_Review' })
  reviewId: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  createdAt: string;

  @Column({
    type: 'int',
    default: 0,
  })
  likes: number;

  /*
   * userId
   * */
  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn()
  reviewerId: User;

  /*
   * referencing event
   * */
  @ManyToOne(() => Event, (event) => event.eventId)
  @JoinColumn()
  eventId: Event;
}
