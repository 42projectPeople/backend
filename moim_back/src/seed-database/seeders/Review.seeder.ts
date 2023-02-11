import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { Review } from '../../entity/Review.entity'
import { User } from 'src/entity/User.entity'
import { Hashtag } from 'src/entity/Hashtag.entity'

export default class ReviewSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const Factory = factoryManager.get(Review)

    for (let i = 0; i < 10; i++) {
      try {
        await Factory.save()
      } catch (e) {
        i--
        continue
      }
    }
  }
}
