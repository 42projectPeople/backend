import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TokenSession {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_session' })
  userId: number
  @Column()
  refreshToken: string
  @Column()
  accessToken: string
}
