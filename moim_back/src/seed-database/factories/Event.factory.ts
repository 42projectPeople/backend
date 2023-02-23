import { setSeederFactory } from 'typeorm-extension'
import { Event } from '../../entity/Event.entity'

export default setSeederFactory(Event, (faker) => {
  const fakeEvent = new Event()

  fakeEvent.createdAt = faker.date.past(10).toISOString()
  fakeEvent.eventDate = faker.date.soon().toISOString()
  fakeEvent.modifiedAt = faker.date.recent().toISOString()
  fakeEvent.main_image = faker.image.avatar()
  fakeEvent.content = faker.internet.url()
  fakeEvent.views = faker.datatype.number({
    min: 0,
    max: 5,
  })
  fakeEvent.location = faker.address.streetAddress()
  fakeEvent.latitude = faker.datatype.float({
    min: -90,
    max: 90,
  })
  fakeEvent.longitude = faker.datatype.float({
    min: -90,
    max: +90,
  })
  fakeEvent.header = faker.word.adjective({
    length: {
      min: 0,
      max: 100,
    },
  })
  fakeEvent.rating = faker.datatype.number({
    min: 0,
    max: 5,
  })
  fakeEvent.maxParticipant = faker.datatype.number({
    min: 5,
    max: 100,
  })
  fakeEvent.curParticipant = faker.datatype.number({
    min: 0,
    max: 5,
  })
  const host = faker.datatype.number({
    min: 0,
    max: 10,
  })
  fakeEvent.host = host
  fakeEvent.host_Id = host
  const hashtag = faker.datatype.number({
    min: 0,
    max: 10,
  })
  fakeEvent.hashtag = hashtag
  fakeEvent.hashtag_Id = hashtag
  return fakeEvent
})
