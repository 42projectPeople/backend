import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateUserDto } from './createUserDto'

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['userName'])
) {}
