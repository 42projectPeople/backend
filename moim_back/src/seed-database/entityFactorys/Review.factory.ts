import { Review } from '../../entity/Review.entity'
import { faker } from '@faker-js/faker'

const ReviewFactory = (maxUserNumber: number): Review => {
  const fakeReview = new Review()

  fakeReview.content = faker.word.noun({
    length: {
      min: 1,
      max: 400,
    },
  })
  fakeReview.likes = faker.datatype.number({
    min: 0,
    max: 100,
  })
  fakeReview.reviewerId = faker.datatype.number({
    min: 1,
    max: maxUserNumber,
  })

  fakeReview.eventId = faker.datatype.number({
    min: 1,
    max: maxUserNumber,
  })

  fakeReview.createdAt = faker.date.recent(10)
  return fakeReview
}

export default ReviewFactory
