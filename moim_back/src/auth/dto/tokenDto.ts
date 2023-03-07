import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean } from 'class-validator'

export class TokenDto {
  readonly accessToken: string
  readonly refreshToken: string
}
