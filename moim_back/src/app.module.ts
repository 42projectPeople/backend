import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Hashtag } from './entity/Hashtag.entity'
import { Event } from './entity/Event.entity'
import { Review } from './entity/Review.entity'
import { User } from './entity/User.entity'
import { EventModule } from './event/event.module'
import { User_Events } from './entity/User_Events.entity'
import { ReviewModule } from './review/review.module'
import { UserModule } from './user/user.module'
import { UserEventsModule } from './user-events/user-events.module'
import { HashtagModule } from './hashtag/hashtag.module'
import { HealthModule } from './health/health.module'
import { AuthModule } from './auth/auth.module'
import { TokenSession } from './entity/TokenSession.entity'
import { SearchModule } from './search/search.module'
import { MapModule } from './map/map.module'
import { HomeModule } from './home/home.module'
import { ReportModule } from './report/report.module'
import { Report } from './entity/Report.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number.parseInt(process.env.PORT) | 3306,
      username: process.env.DBUSER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Event, Hashtag, Review, User, User_Events, Report],
      // NOTE: user_event의 drop 관련 문제 때문에 꺼뒀습니다.
      // https://github.com/42projectPeople/backend/discussions/39
      synchronize: true, //특정 조건하에서 모든 데이터를 삭제하는 것 같습니다. 프로덕션에서는 사용하지 않는게 좋습니다.
      logging: true,
      legacySpatialSupport: false,
      // ERROR [ExceptionsHandler] ER_SP_DOES_NOT_EXIST
      //  에러가 발생하여 찾아본 결과 AsText() 함수가 deprecate 되어 발생한 에러였음
      // 이를 해결하기 위해 TypeOrmModule 설정에서 legacySpatialSupport: false 를 추가하여 해결했음
    }),
    TypeOrmModule.forRoot({
      name: 'session',
      type: 'mysql',
      host: process.env.HOST,
      port: Number.parseInt(process.env.PORT) | 3306,
      username: process.env.DBUSER,
      password: process.env.PASSWORD,
      database: process.env.SESSION_DB_NAME,
      entities: [TokenSession],
      synchronize: true, //특정 조건하에서 모든 데이터를 삭제하는 것 같습니다. 프로덕션에서는 사용하지 않는게 좋습니다.
      logging: true,
    }),
    UserModule,
    ReviewModule,
    EventModule,
    UserEventsModule,
    HashtagModule,
    HealthModule,
    AuthModule,
    SearchModule,
    MapModule,
    HomeModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
