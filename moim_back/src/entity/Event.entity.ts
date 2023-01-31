import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Hashtag } from './Hashtag.entity';
import { Review } from './Review.entity';
import { User } from './User.entity';

@Entity()
@Unique('unique_event_createdAt_host', ['createdAt', 'host'])
export class Event {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_Event' })
  eventId: number;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  createdAt: string;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  eventDate: string;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  modifiedAt: string;

  @Column({
    type: 'char',
    length: '100',
    nullable: true,
    comment: 'URL',
  })
  main_image: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  content: string;

  @Column({
    type: 'int',
    default: 0,
  })
  views: number;

  @Column({
    type: 'char',
    length: 100,
    nullable: false,
  })
  location: string;

  @Column({
    type: 'float',
    nullable: false,
  })
  latitude: number;

  @Column({
    type: 'float',
    nullable: false,
  })
  longitude: number;

  @Column({
    type: 'char',
    length: 100,
  })
  header: string;

  @Column({
    type: 'float',
    default: 0,
  })
  rating: number;

  @Column({
    type: 'int',
  })
  maxParticipant: number;

  @Column({
    type: 'int',
  })
  curParticipant: number;

  @ManyToOne(() => User, (user) => user.userId)
  host: User | number;

  @ManyToMany(() => User, (user) => user.enrollEvents)
  enrollUsers: User[];

  /*
   * event's hashtag
   * */
  @ManyToOne(() => Hashtag, (hashtag) => hashtag.event)
  hashtag: Hashtag[];

  @OneToMany(() => Review, (review) => review.reviewId)
  reviewIds: Review[];
}
