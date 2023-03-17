import { ApiProperty, ApiTags } from '@nestjs/swagger'
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { Event } from './Event.entity'
import { User } from './User.entity'

@Entity()
@ApiTags('hashtag api')
@Unique('unique_Hashtag_hashtagName', ['hashtagName'])
export class Hashtag {
  @ApiProperty({
    description: '해시태그 아이디',
    example: 1,
  })
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_Hashtag',
  })
  hashtagId: number

  @ApiProperty({
    description: '해시태그 이름',
    example: '커피',
  })
  @Column({
    type: 'char',
    length: '50',
    nullable: false,
  })
  hashtagName: string

  @OneToMany(() => Event, (event) => event.hashtag)
  event: Event[]

  @ManyToMany(() => User, (user) => user.hashtags)
  users: User[]
}
