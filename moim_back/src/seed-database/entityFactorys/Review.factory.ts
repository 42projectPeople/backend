import { Review } from 'src/entity/Review.entity'
import { faker } from '@faker-js/faker'
import EventFactory from './Event.factory'
import UserFactory from './User.factory'

const ReviewFactory = (): Review => {
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
  fakeReview.reviewerId = UserFactory()
  fakeReview.eventId = EventFactory()
  fakeReview.createdAt = faker.date.recent(10)
  return fakeReview
}

export default ReviewFactory
