import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { User_Events } from '../../entity/User_Events.entity'

export default class UserEventSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const Factory = factoryManager.get(User_Events)
    for (let i = 0; i < 20; i++) {
      try {
        await Factory.save()
      } catch (e) {
        i--
        continue
      }
    }
  }
}
