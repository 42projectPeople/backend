import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { User } from '../../entity/User.entity'

const QT = 1000

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const Factory = factoryManager.get(User)

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
