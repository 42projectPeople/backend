import { DataSource, DataSourceOptions } from 'typeorm'
import { runSeeders, SeederOptions } from 'typeorm-extension'
import * as dotenv from 'dotenv'
import { User } from '../entity/User.entity'
import { User_Events } from '../entity/User_Events.entity'
import { Hashtag } from '../entity/Hashtag.entity'
import { Review } from '../entity/Review.entity'
import { Event } from '../entity/Event.entity'
import UserSeeder from './seeders/User.seeder'

console.log('.dev.dev.local로만 작동합니다.')
console.log('.dev.dev.local로만 작동합니다.')
console.log('.dev.dev.local로만 작동합니다.')
console.log('.dev.dev.local로만 작동합니다.')
console.log()
console.log('프로덕션 환경에서 사용 시, 법적책임은 당신에게 있습니다.')
console.log(
  '데이터의 양을 조절하고싶다면, env파일에 변수를 추가하고, 각 seeders의 for문을 수정하세용'
)

console.log(
  'drop scheme가 기본적으로 활성화되어있습니다. 기존 데이터베이스가 모두 날라가니 주의하세요'
)
console.log('5초뒤 수행됩니다.')
const runner = async () => {
  dotenv.config({
    path: '.env.dev',
  })

  const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    database: process.env.DATABASE,
    username: process.env.DBUSER,
    host: process.env.HOST,
    password: process.env.PASSWORD,

    dropSchema: true,
    synchronize: true,
    entities: [User, User_Events, Hashtag, Event, Review],
    seeds: [UserSeeder],
  }
  const datasource = new DataSource(options)
  await datasource.initialize()

  runSeeders(datasource)
  console.log('end, SIGINT')
}

setTimeout(runner, 1000)
