import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm/browser'
import { User } from '../entity/User.entity'
import { UserRoleType } from './utils/UserRole.type'
import { ConfigModule } from '@nestjs/config'
import { Event } from '../entity/Event.entity'
import { Hashtag } from '../entity/Hashtag.entity'
import { Review } from '../entity/Review.entity'
import { User_Events } from '../entity/User_Events.entity'

async function setMockUser(dataSource: DataSource): Promise<void> {
  const user = new User({
    userId: 1,
    userName: 'MockUserName',
    userNickName: 'MockUserNickName',
    userRole: UserRoleType.USER,
    userProfilePhoto: '/profile/default.png',
    userLevel: 0.0,
    userTitle: 'title',
  })
  for (let i = 1; i <= 10; ++i) {
    const tmp = user
    tmp.userId = i
    tmp.userName = user.userName + '_' + i
    tmp.userNickName = user.userNickName + '_' + i
    await dataSource.manager.save(User, tmp)
  }
}

/**
 * NOTE: USING TEMPORARY DATABASE!!
 */

describe('UserService', () => {
  let service: UserService
  let dataSource: DataSource

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.test'],
        }),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.HOST,
          port: Number.parseInt(process.env.PORT) || 3306,
          username: process.env.DBUSER,
          password: process.env.PASSWORD,
          database: 'USER_SERVICE_TEST_DB',
          entities: [Event, Hashtag, Review, User, User_Events],
          synchronize: false, //특정 조건하에서 모든 데이터를 삭제하는 것 같습니다. 프로덕션에서는 사용하지 않는게 좋습니다.
          logging: true,
        }),
      ],
      providers: [UserService],
    }).compile()

    service = module.get<UserService>(UserService)
    dataSource = module.get<DataSource>(DataSource)
    // set mock data
    await setMockUser(dataSource)
  })

  afterAll(async () => {
    await dataSource.dropDatabase()
    await dataSource.destroy()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
