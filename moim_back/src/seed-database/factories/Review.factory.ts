import { setSeederFactory } from 'typeorm-extension'
import { Review } from '../../entity/Review.entity'
import EventFactory from '../entityFactorys/Event.factory'
import UserFactory from '../entityFactorys/User.factory'

export default setSeederFactory(Review, (faker) => {
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
})
