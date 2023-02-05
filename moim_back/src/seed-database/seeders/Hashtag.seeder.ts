import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { Hashtag } from '../../entity/Hashtag.entity'

export default class HashtagSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const Factory = factoryManager.get(Hashtag)

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
