import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User.entity'

@Entity()
export class EventMembers {
  @PrimaryGeneratedColumn()
  eventMembersId: number

  @Column()
  hostId: number

  @Column({
    type: 'char',
    length: 100,
    nullable: true,
    comment: '해당 이벤트 주제',
  })
  eventHeader: string

  @Column()
  eventId: number

  @OneToMany(() => User, (user) => user.userId)
  guests: User[]
}
