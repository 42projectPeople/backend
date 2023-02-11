import { PickType } from '@nestjs/swagger'
import CreateReviewDto from './createReviewDto'

/*
 * used in controller layer
 * */
export class RequestUpdateReviewDto extends PickType(CreateReviewDto, [
  'content',
  'reviewerId',
]) {}
