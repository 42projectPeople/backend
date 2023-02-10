import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm'
import { Event } from './Event.entity'
import { Hashtag } from './Hashtag.entity'
import { Review } from './Review.entity'
import { User_Events } from './User_Events.entity'
import { UserRoleType } from '../user/utils/UserRole.type'

@Entity()
@Unique('unique_User_userName', ['userName'])
@Unique('unique_User_userNickName', ['userNickName'])
export class User {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_User' })
  userId: number

  @Column({ type: 'char', length: 35, nullable: false })
  userName: string

  @Column({ type: 'char', length: 100, nullable: false })
  userNickName: string

  @Column({
    type: 'enum',
    enum: { ADMIN: 'admin', USER: 'user' }, // FIXME: enum 대신 사용한 부분이라 고려해야함
    default: UserRoleType.USER,
  })
  userRole: UserRoleType

  @Column({
    type: 'char',
    length: 100,
    nullable: true,
    default: '/profile/default.png',
    comment: 'URL',
  })
  userProfilePhoto: string

  @Column({ type: 'float', nullable: false, default: '0' })
  userLevel: number

  @Column({ type: 'char', length: 200, nullable: true })
  userTitle: string

  @OneToMany(() => User_Events, (ue) => ue.userId)
  participants: User_Events[]

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.users)
  @JoinTable({
    name: 'user_interest_hashtags',
    joinColumn: {
      name: 'User',
      referencedColumnName: 'userId',
    },
    inverseJoinColumn: {
      name: 'Hashtag',
      referencedColumnName: 'hashtagId',
    },
  })
  hashtags: Hashtag[]

  @OneToMany(() => Event, (event) => event.host)
  hostingEvent: Event[]

  @OneToMany(() => Review, (review) => review.eventId)
  reviews: Review[]
}
