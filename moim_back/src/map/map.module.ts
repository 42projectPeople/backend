import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MapController } from './map.controller'
import { MapService } from './map.service'

@Module({
  imports: [ConfigModule],
  controllers: [MapController],
  providers: [MapService],
})
export class MapModule {}
