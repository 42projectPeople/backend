import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User.entity'
import { ReportType } from 'src/report/enum/ReportType.enum'

@Entity()
export class Report {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_Report',
  })
  reportId: number

  @ManyToOne(() => User, (user) => user.reports, { nullable: false })
  @JoinColumn({
    name: 'reporterId',
  })
  reporterId: User | number

  @Column({
    type: 'text',
  })
  content: string

  @CreateDateColumn()
  createdAt: Date

  @Column({
    type: 'boolean',
    default: false,
  })
  isResolved: boolean

  @Column({
    type: 'enum',
    enum: { USER: 'U', REVIEW: 'R', EVENT: 'E' },
    nullable: false,
  })
  reportType: ReportType

  @Column({
    type: 'int',
    nullable: false,
  })
  idToBeReported: number
}
