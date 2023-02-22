import { PickType } from '@nestjs/swagger'
import CreateReviewDto from './createReview.dto'
/*
 * used in controller layer
 * exposed in api
 * */
export class ControllerUpdateReviewDto extends PickType(CreateReviewDto, [
  'content',
  'eventId',
] as const) {}
