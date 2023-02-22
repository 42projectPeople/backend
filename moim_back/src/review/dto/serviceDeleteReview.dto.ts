export class ServiceDeleteReviewDto {
  private readonly reviewId: number
  private readonly userId: number

  constructor(reviewId: number, userId: number) {
    this.reviewId = reviewId
    this.userId = userId
  }

  getReviewId(): number {
    return this.reviewId
  }

  getUserId(): number {
    return this.userId
  }
}
