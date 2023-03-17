import { ApiProperty, PickType } from '@nestjs/swagger'
import { UserEventRoleType } from '../utils/UserEventRoleType'
import { PaginationDto } from './Pagination.dto'

// enum UserRole {
//   ADMIN = 'admin',
//   USER = 'user',
//   GUEST = 'guest',
// }

export class GetUserEventDto extends PickType(PaginationDto, [
  'page',
  'pageSize',
] as const) {
  @ApiProperty({
    enum: UserEventRoleType,
    enumName: 'UserEventRoleType',
  })
  role: UserEventRoleType
}
