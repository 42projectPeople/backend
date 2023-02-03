import { PartialType, PickType } from '@nestjs/swagger'
import CreateReviewDto from './createReviewDto'

export class DeleteReviewDto extends PartialType(
  PickType(CreateReviewDto, ['reviewerId'] as const)
) {}
