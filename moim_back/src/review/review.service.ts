import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entity/Review.entity';
import { Repository } from 'typeorm';
import CreateReviewDto from './dto/createReviewDto';
import UpdateReviewDto from './dto/updateReviewDto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async findReviewByEventID(eventId: number) {
    return await this.reviewRepository.find({
      where: { eventId: eventId },
    })
  }

  create(createReviewDto: CreateReviewDto) {
    return 'This action adds a new review';
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`
  }

  remove(id: number) {
    return `This action removes a #${id} review`
  }
}
