import { Module } from '@nestjs/common'
import { ReviewService } from './review.service'
import { ReviewController } from './review.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Review } from 'src/entity/Review.entity'
import { Event } from 'src/entity/Event.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Review, Event])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
