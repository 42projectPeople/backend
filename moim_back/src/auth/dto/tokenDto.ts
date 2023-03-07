import { ApiProperty } from '@nestjs/swagger'

export class TokenDto {
  @ApiProperty({
    description: 'access token',
    required: true,
  })
  readonly accessToken: string

  @ApiProperty({
    description: 'refresh token',
    required: true,
  })
  readonly refreshToken: string
}
