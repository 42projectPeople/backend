import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import localConfiguration from './config/localConfiguration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev.local'],
      load: [localConfiguration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
