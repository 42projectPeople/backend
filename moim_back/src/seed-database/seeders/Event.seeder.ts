import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { Event } from '../../entity/Event.entity'

const QT = 1000

export default class EventSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const Factory = factoryManager.get(Event)
    for (let i = 0; i < QT; i++) {
      try {
        await Factory.save()
      } catch (e) {
        i--
        continue
      }
    }
  }
}
