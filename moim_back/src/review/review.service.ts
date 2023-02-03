import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Review } from 'src/entity/Review.entity'
import { Repository } from 'typeorm'
import CreateReviewDto from './dto/createReviewDto'
import { DeleteReviewDto } from './dto/deleteReviewDto'
import { UpdateReviewDto } from './dto/updateReviewDto'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>
  ) {}

  async findReviewByEventID(eventId: number) {
    return await this.reviewRepository.find({
      where: { eventId: eventId },
    })
  }

  async create(createReviewDto: CreateReviewDto) {
    try {
      await this.reviewRepository
        .createQueryBuilder()
        .insert()
        .into(Review)
        .values(CreateReviewDto.toEntity(createReviewDto))
        .execute()
    } catch (err) {
      //database error
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  async update(reviewId: number, updateReviewDto: UpdateReviewDto) {
    try {
      await this.reviewRepository
        .createQueryBuilder()
        .update()
        .set({
          content: updateReviewDto.content,
          modifiedAt: () => 'CURRENT_TIMESTAMP',
        })
        .where('reviewId = :id', { id: reviewId })
        .execute()
    } catch (err) {
      throw new InternalServerErrorException('database server error')
    }
  }

  async remove(reviewId: number) {
    try {
      await this.reviewRepository
        .createQueryBuilder()
        .update()
        .set({
          deleted: true,
          modifiedAt: () => 'CURRENT_TIMESTAMP',
        })
        .where('reviewId = :id', { id: reviewId })
        .execute()
    } catch (err) {
      throw new InternalServerErrorException('db err')
    }
  }
}
