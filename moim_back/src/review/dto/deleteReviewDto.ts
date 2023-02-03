import { ApiProperty, PartialType, PickType } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import CreateReviewDto from './createReviewDto'

export class DeleteReviewDto extends PartialType(
  PickType(CreateReviewDto, ['reviewerId'] as const)
) {}
