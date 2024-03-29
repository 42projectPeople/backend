import { Event } from '../../entity/Event.entity'
import { faker } from '@faker-js/faker'

const EventFactory = (maxUserNumber: number): Event => {
  const fakeEvent = new Event()

  fakeEvent.createdAt = faker.date.past(10).toISOString()
  fakeEvent.eventDate = faker.date.soon().toISOString()
  fakeEvent.modifiedAt = faker.date.recent().toISOString()
  fakeEvent.images = [
    faker.image.imageUrl(640, 480, 'cat', true),
    faker.image.imageUrl(640, 480, 'fashion', true),
    faker.image.imageUrl(640, 480, 'people', true),
  ].join(' ')
  fakeEvent.openTalkLink = faker.internet.url()
  fakeEvent.content = faker.word.conjunction()
  fakeEvent.views = faker.datatype.number({
    min: 0,
    max: 5,
  })
  fakeEvent.location = faker.address.streetAddress()
  fakeEvent.tradeName = faker.address.buildingNumber()
  fakeEvent.latitude = faker.datatype.float({
    min: -90,
    max: 90,
  })
  fakeEvent.longitude = faker.datatype.float({
    min: -180,
    max: +180,
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
  fakeEvent.curParticipant = 0

  fakeEvent.host = faker.datatype.number({
    min: 1,
    max: maxUserNumber,
  })

  fakeEvent.hashtag = faker.datatype.number({
    min: 1,
    max: 7,
  })

  return fakeEvent
}

export default EventFactory
