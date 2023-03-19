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
import { ApiProperty, ApiTags } from '@nestjs/swagger'

@Entity()
@ApiTags('user api')
@Unique('unique_User_userName', ['userName'])
@Unique('unique_User_userNickName', ['userNickName'])
export class User {
  constructor(...info: any) {
    this.userId = info.userId
    this.userName = info.userName
    this.userNickName = info.userNickName
    this.userRole = info.userRole
    this.userProfilePhoto = info.userProfilePhoto
    this.userLevel = info.userLevel
    this.userTitle = info.userTitle
  }
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_User' })
  @ApiProperty({
    description: 'user id',
  })
  userId: number

  @Column({ type: 'char', length: 35, nullable: false })
  @ApiProperty({
    description: 'user name (unique)',
  })
  userName: string

  @Column({ type: 'char', length: 100, nullable: true, default: null })
  @ApiProperty({
    description: 'user nickname (unique)',
  })
  userNickName: string

  @Column({
    type: 'enum',
    enum: { ADMIN: 'admin', USER: 'user' }, // FIXME: enum 대신 사용한 부분이라 고려해야함
    default: UserRoleType.USER,
  })
  @ApiProperty({
    description: 'user role ("admin" || "user")',
  })
  userRole: UserRoleType

  @Column({
    type: 'char',
    length: 100,
    nullable: true,
    default: '/profile/default.png',
    comment: 'URL',
  })
  @ApiProperty({
    description: 'profile photo url',
  })
  userProfilePhoto: string

  @Column({ type: 'float', nullable: false, default: '0' })
  @ApiProperty({
    description: 'user level (float)',
  })
  userLevel: number

  @Column({ type: 'char', length: 200, nullable: true })
  @ApiProperty({
    description: 'user title',
  })
  userTitle: string

  @OneToMany(() => User_Events, (ue) => ue.userId)
  participants: User_Events[]

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.users, { cascade: true })
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
