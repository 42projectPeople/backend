import { PickType } from '@nestjs/swagger'
import CreateReviewDto from './createReview.dto'
/*
 * used in controller layer
 * exposed in api
 * */
export class UpdateReviewDto extends PickType(CreateReviewDto, [
  'content',
] as const) {
  getContent(): string {
    return this.content
  }
}
