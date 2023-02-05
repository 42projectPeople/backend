import { Hashtag } from 'src/entity/Hashtag.entity'
import { Review } from 'src/entity/Review.entity'
import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { User } from '../../entity/User.entity'

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userFactory = factoryManager.get(User)

    await userFactory.saveMany(10)
  }
}
