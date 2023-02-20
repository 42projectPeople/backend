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
import { SearchModule } from './search/search.module'
import { TokenSession } from './entity/TokenSession.entity'

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
      entities: [Event, Hashtag, Review, User, User_Events],
      // NOTE: user_event의 drop 관련 문제 때문에 꺼뒀습니다.
      // https://github.com/42projectPeople/backend/discussions/39
      synchronize: false, //특정 조건하에서 모든 데이터를 삭제하는 것 같습니다. 프로덕션에서는 사용하지 않는게 좋습니다.
      logging: true,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
