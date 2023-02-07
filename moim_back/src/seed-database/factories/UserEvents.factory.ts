import { User_Events } from '../../entity/User_Events.entity'
import { setSeederFactory } from 'typeorm-extension'

export default setSeederFactory(User_Events, (faker) => {
  const fakeUserEvents = new User_Events()

  fakeUserEvents.eventId = faker.datatype.number({
    min: 1,
    max: 10,
  })

  fakeUserEvents.userId = faker.datatype.number({
    min: 1,
    max: 10,
  })

  return fakeUserEvents
})
