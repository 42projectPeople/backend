import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Event } from "./Event.entity";
import { User } from "./User.entity";

@Entity()
@Unique("unique_Hashtag_hashtagName", ["hashtagName"])
export class Hashtag {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: "pk_Hashtag",
  })
  hashtagId: number;

  @Column({
    type: "char",
    length: "50",
    nullable: false,
  })
  hashtagName: string;

  @ManyToMany(() => Event, (event) => event.hashtags)
  events: Event[];

  @ManyToMany(() => User, (user) => user.hashtags)
  users: User[];
}
