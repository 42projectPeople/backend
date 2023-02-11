import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateUserRequestDto } from './createUserRequestDto'

export class UpdateUserRequestDto extends PartialType(
  OmitType(CreateUserRequestDto, ['userName'])
) {}
