import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from './entity/Hashtag.entity';
import { Event } from './entity/Event.entity';
import { Review } from './entity/Review.entity';
import { User } from './entity/User.entity';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number.parseInt(process.env.PORT) | 3306,
      username: process.env.DBUSER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Event, Hashtag, Review, User],
      synchronize: true, //특정 조건하에서 모든 데이터를 삭제하는 것 같습니다. 프로덕션에서는 사용하지 않는게 좋습니다.
      logging: true,
    }),
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
