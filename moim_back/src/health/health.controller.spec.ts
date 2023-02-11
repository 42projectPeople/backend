import * as request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { HealthModule } from './health.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

/*
 * 종단간 테스트 예시입니다.
 * e2e 테스트는 최종 사용자와 상호작용하는 종류의 상호작용입니다.
 * 쉽게말해 HTTP request를 테스트하는 것입니다.
 * */

/*
 * describe는 1개의 테스트를 구성합니다.
 * */
describe('HealthController', () => {
  let app: INestApplication

  /*
   * beforeAll에서 describe내의 테스트 코드 전에 수행할 작업을 명시합니다.
   * */
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        //Database 환경변수 설정파일
        //프로덕션 전 테스트에서는 변경되어야합니다.
        ConfigModule.forRoot({
          envFilePath: ['.env.dev.local'],
        }),
        //local database 설정
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.HOST,
          port: Number.parseInt(process.env.PORT) | 3306,
          username: process.env.DBUSER,
          password: process.env.PASSWORD,
          database: process.env.DATABASE,
        }),
        HealthModule,
      ],
    }).compile()

    //nestJs 런타임환경을 인스턴스화합니다.
    app = moduleRef.createNestApplication()
    await app.init()
  })

  /*
   * /health 경로의 http status는 반드시 200이어야합니다.
   * */
  it('GET /health', () => {
    return request(app.getHttpServer()).get('/health').expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
