import { setSeederFactory } from 'typeorm-extension'
import { Review } from '../../entity/Review.entity'

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
  fakeReview.reviewerId = faker.datatype.number({
    min: 1,
    max: 10,
  })
  fakeReview.eventId = faker.datatype.number({
    min: 1,
    max: 10,
  })
  fakeReview.createdAt = faker.date.recent(10).toISOString()
  return fakeReview
})
