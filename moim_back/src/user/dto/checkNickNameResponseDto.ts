import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean } from 'class-validator'

export class CheckNickNameResponseDto {
  @ApiProperty({
    description: 'is valid nickname (boolean)',
  })
  @IsBoolean()
  readonly isValid: boolean
}
