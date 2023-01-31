import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Event } from './Event.entity';
import { User } from './User.entity';

@Entity()
@Unique('unique_Hashtag_hashtagName', ['hashtagName'])
export class Hashtag {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_Hashtag',
  })
  hashtagId: number;

  @Column({
    type: 'char',
    length: '50',
    nullable: false,
  })
  hashtagName: string;

  @OneToMany(() => Event, (event) => event.hashtag)
  event: Event[];

  @ManyToMany(() => User, (user) => user.hashtags)
  users: User[];
}
