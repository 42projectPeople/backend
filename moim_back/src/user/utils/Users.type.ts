import { User } from '../../entity/User.entity'
import { ApiProperty } from '@nestjs/swagger'

export class Users {
  @ApiProperty({
    description: 'User list',
  })
  Users: User[]
}
