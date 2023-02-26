import { SetMetadata } from '@nestjs/common'

/**
 * Metadata @UserRole(role)
 * @param userRole
 * @constructor
 */
export const UserRole = (...userRole: string[]) =>
  SetMetadata('userRole', userRole)
