import { PartialType, PickType } from '@nestjs/swagger'
import CreateReviewDto from './createReviewDto'

export class UpdateReviewDto extends PickType(CreateReviewDto, [
  'content',
  'reviewerId',
] as const) {}
