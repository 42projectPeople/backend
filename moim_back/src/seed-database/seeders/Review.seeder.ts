import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { Review } from '../../entity/Review.entity'

const QT = 1000

export default class ReviewSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const Factory = factoryManager.get(Review)

    for (let i = 0; i < QT; i++) {
      try {
        await Factory.save()
      } catch (e) {
        console.log(e.message)
        i--
        continue
      }
    }
  }
}
