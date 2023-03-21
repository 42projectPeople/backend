import { Event } from '../../entity/Event.entity'
import { Hashtag } from '../../entity/Hashtag.entity'
import { Review } from '../../entity/Review.entity'
import { User_Events } from '../../entity/User_Events.entity'
import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { User } from '../../entity/User.entity'
import EventFactory from '../entityFactorys/Event.factory'
import HashtagFactory from '../entityFactorys/Hashtag.factory'
import ReviewFactory from '../entityFactorys/Review.factory'
import UserFactory from '../entityFactorys/User.factory'
import UserEventFactory from '../entityFactorys/UserEvents.factory'

const QT = 100

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    //save user

    //save hashtag
    for (let i = 0; i < 7; i++) {
      const fakeHashtag = HashtagFactory()
      try {
        await dataSource.getRepository(Hashtag).save(fakeHashtag)
      } catch (e) {
        console.log(e.message)
        i--
        continue
      }
    }

    //save userEvents
    for (let i = 0; i < QT; i++) {
      const fakeUserEvent = UserEventFactory()
      try {
        await dataSource.getRepository(User_Events).save(fakeUserEvent)
      } catch (e) {
        console.log(e.message)
        i--
        continue
      }
    }

    //save review
    for (let i = 0; i < QT; i++) {
      const fakeReview = ReviewFactory()
      try {
        await dataSource.getRepository(Review).save(fakeReview)
      } catch (e) {
        console.log(e.message)
        i--
        continue
      }
    }

    for (let i = 0; i < QT; i++) {
      const fakeUser = UserFactory()
      try {
        await dataSource.getRepository(User).save(fakeUser)
      } catch (e) {
        console.log(e.message)
        i--
        continue
      }
    }

    //save 100 event
    for (let i = 0; i < QT; i++) {
      const fakeEvent = EventFactory()
      try {
        await dataSource.getRepository(Event).save(fakeEvent)
      } catch (e) {
        console.log(e.message)
        i--
        continue
      }
    }
  }
}
