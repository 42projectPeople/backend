import { DataSource, DataSourceOptions } from 'typeorm'
import { runSeeders, SeederOptions } from 'typeorm-extension'
import * as dotenv from 'dotenv'
import { User } from '../entity/User.entity'
import { User_Events } from '../entity/User_Events.entity'
import { Hashtag } from '../entity/Hashtag.entity'
import { Review } from '../entity/Review.entity'
import { Event } from '../entity/Event.entity'
import UserSeeder from './seeders/User.seeder'
import HashtagSeeder from './seeders/Hashtag.seeder'
import ReviewSeeder from './seeders/Review.seeder'
import EventSeeder from './seeders/Event.seeder'
import UserEventSeeder from './seeders/UserEvents.seeder'
;(async () => {
  dotenv.config({
    path: '.env.dev.local',
  })

  if (process.env.DBENV != '.env.dev.local') return
  const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    database: process.env.DATABASE,
    username: process.env.DBUSER,
    host: process.env.HOST,
    password: process.env.PASSWORD,

    dropSchema: true,
    synchronize: true,
    entities: [User, User_Events, Hashtag, Event, Review],
    seeds: [
      UserSeeder,
      HashtagSeeder,
      EventSeeder,
      ReviewSeeder,
      UserEventSeeder,
    ],
    factories: ['src/seed-database/factories/*.ts'],
  }
  const datasource = new DataSource(options)
  await datasource.initialize()

  runSeeders(datasource)
  console.log('end, SIGINT')
})()
