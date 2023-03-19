import { User_Events } from 'src/entity/User_Events.entity'
import EventFactory from './Event.factory'
import UserFactory from './User.factory'

const UserEventFactory = () => {
  const fakeUserEvents = new User_Events()

  fakeUserEvents.event = EventFactory()

  fakeUserEvents.user = UserFactory()

  return fakeUserEvents
}

export default UserEventFactory
