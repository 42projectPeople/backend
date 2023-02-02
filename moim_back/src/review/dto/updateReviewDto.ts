import { PartialType, PickType } from '@nestjs/swagger'
import CreateReviewDto from './createReviewDto'

export class UpdateReviewDto extends PartialType(
  PickType(CreateReviewDto, ['content'] as const)
) {}
