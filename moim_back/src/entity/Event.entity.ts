import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm'
import { Hashtag } from './Hashtag.entity'
import { Review } from './Review.entity'
import { User } from './User.entity'

@Entity()
@Unique('unique_event_createdAt_host', ['createdAt', 'host'])
export class Event {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_Event' })
  eventId: number

  @Column({
    type: 'datetime',
    precision: 6,
    nullable: false,
  })
  createdAt: string

  @Column({
    type: 'datetime',
    nullable: false,
  })
  eventDate: string | null

  @Column({
    type: 'datetime',
    nullable: true,
  })
  modifiedAt: string

  @Column({
    type: 'char',
    length: '100',
    nullable: true,
    comment: 'URL',
  })
  main_image: string

  @Column({
    type: 'char',
    length: 100,
    nullable: false,
    comment: 'URL',
  })
  content: string

  @Column({
    type: 'int',
    default: 0,
  })
  views: number

  @Column({
    type: 'char',
    length: 100,
    nullable: false,
  })
  location: string

  @Column({
    type: 'float',
    nullable: false,
  })
  latitude: number

  @Column({
    type: 'float',
    nullable: false,
  })
  longitude: number

  @Column({
    type: 'char',
    length: 100,
  })
  header: string

  @Column({
    type: 'float',
    default: 0,
  })
  rating: number

  @Column({
    type: 'int',
  })
  maxParticipant: number

  @Column({
    type: 'int',
  })
  curParticipant: number

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({
    name: 'hostId',
  })
  host: User | number

  @ManyToMany(() => User, (user) => user.enrollEvents)
  enrollUsers: User[]

  /*
   * event's hashtag
   * */
  @ManyToOne(() => Hashtag, (hashtag) => hashtag.event)
  @JoinColumn({
    name: 'hashtagId',
  })
  hashtag: Hashtag | number

  @OneToMany(() => Review, (review) => review.reviewId)
  reviewIds: Review[]
}
