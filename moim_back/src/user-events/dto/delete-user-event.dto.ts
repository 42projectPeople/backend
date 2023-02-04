import { PartialType, PickType } from '@nestjs/swagger'
import { CreateUserEventDto } from './create-user-event.dto'

export class DeleteUserEventDto extends PartialType(
  PickType(CreateUserEventDto, ['userId'] as const)
) {}
