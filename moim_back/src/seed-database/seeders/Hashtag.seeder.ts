import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { Hashtag } from '../../entity/Hashtag.entity'

const QT = 1000

export default class HashtagSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const Factory = factoryManager.get(Hashtag)

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
