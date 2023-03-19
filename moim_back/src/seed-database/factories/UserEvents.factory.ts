import { User_Events } from '../../entity/User_Events.entity'
import { setSeederFactory } from 'typeorm-extension'
import EventFactory from '../entityFactorys/Event.factory'
import UserFactory from '../entityFactorys/User.factory'

export default setSeederFactory(User_Events, (faker) => {
  const fakeUserEvents = new User_Events()

  fakeUserEvents.event = EventFactory()
  fakeUserEvents.user = UserFactory()

  return fakeUserEvents
})
