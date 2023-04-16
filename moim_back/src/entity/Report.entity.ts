import { ApiProperty, ApiTags } from '@nestjs/swagger'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { Event } from './Event.entity'
import { User } from './User.entity'

const enum ReportType {
  USER = 'U',
  REVIEW = 'R',
  EVENT = 'E',
}

@Entity()
export class Report {
  @ApiProperty({
    description: '신고 ID',
    example: 1,
  })
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_Report',
  })
  reportId: number

  @ApiProperty({
    description: '신고 한 유저의 ID',
    example: 1,
  })
  @ManyToOne(() => User, (user) => user.reports, { nullable: false })
  @JoinColumn({
    name: 'reporterId',
  })
  reporterId: User

  @CreateDateColumn()
  createdAt: Date

  @ApiProperty({
    description: '해결된 신고인가?',
  })
  @Column({
    type: 'boolean',
    default: false,
  })
  isResolved: boolean

  @ApiProperty({
    description: '무엇은 신고하는가?, USER: U, REVIEW: R, EVENT: E',
    example: 'U',
  })
  @Column({
    type: 'enum',
    enum: { USER: 'U', REVIEW: 'R', EVENT: 'E' },
    nullable: false,
  })
  reportType: ReportType

  @ApiProperty({
    description: '신고할 ID',
    example: 5,
  })
  @Column({
    type: 'int',
    nullable: false,
  })
  idToBeReported: number
}
