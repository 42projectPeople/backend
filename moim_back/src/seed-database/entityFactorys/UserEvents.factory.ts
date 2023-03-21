import { faker } from '@faker-js/faker'
import { User_Events } from '../../entity/User_Events.entity'

const UserEventFactory = (maxUserNumber: number) => {
  const fakeUserEvents = new User_Events()

  const eventId = faker.datatype.number({
    min: 1,
    max: maxUserNumber,
  })

  fakeUserEvents.event = eventId
  fakeUserEvents.eventId = eventId

  const userId = faker.datatype.number({
    min: 1,
    max: maxUserNumber,
  })

  fakeUserEvents.user = userId
  fakeUserEvents.userId = userId

  return fakeUserEvents
}

export default UserEventFactory
