import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Event } from 'src/entity/Event.entity'
import { HomeController } from './home.controller'
import { HomeService } from './home.service'

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
