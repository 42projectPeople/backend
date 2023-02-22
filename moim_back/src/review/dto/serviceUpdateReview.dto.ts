import { Review } from 'src/entity/Review.entity'
import { ControllerUpdateReviewDto } from './controllerUpdateUserDto'

/*
 * used in service layer
 * */
export class ServiceUpdateReviewDto {
  private readonly content: string
  private readonly reviewId: number
  private readonly userId: number //user in session

  constructor(
    controllerUpdateReviewDto: ControllerUpdateReviewDto,
    reviewId: number,
    userId: number
  ) {
    this.content = controllerUpdateReviewDto.content
    this.reviewId = reviewId
    this.userId = userId
  }

  getReviewId(): number {
    return this.reviewId
  }

  getUserId(): number {
    return this.userId
  }

  getPartial(): Partial<Review> {
    return {
      content: this.content,
    }
  }
}
