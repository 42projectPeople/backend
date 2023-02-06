import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Review } from 'src/entity/Review.entity'
import { Repository } from 'typeorm'
import CreateReviewDto from './dto/createReviewDto'
import { UpdateReviewDto } from './dto/updateReviewDto'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>
  ) {}

  async findReviewByEventID(eventId: number) {
    return await this.reviewRepository.find({
      where: { eventId: eventId, deleted: false },
    })
  }

  async findReviewByUserId(userId: number) {
    return await this.reviewRepository.find({
      where: { reviewId: userId, deleted: false },
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
    } catch (e) {
      if (e.errno == 1062)
        //createdAt + reviewerId is duplicated because of too many request
        throw new ConflictException('too fast')
      else throw e
    }
  }

  async update(reviewId: number, updateReviewDto: UpdateReviewDto) {
    await this.reviewRepository
      .createQueryBuilder()
      .update()
      .set({
        content: updateReviewDto.content,
        modifiedAt: () => 'CURRENT_TIMESTAMP',
      })
      .where('reviewId = :id', { id: reviewId })
      .execute()
  }

  async remove(reviewId: number) {
    await this.reviewRepository
      .createQueryBuilder()
      .update()
      .set({
        deleted: true,
        modifiedAt: () => 'CURRENT_TIMESTAMP',
      })
      .where('reviewId = :id', { id: reviewId })
      .execute()
  }
}
