import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Review } from 'src/entity/Review.entity'
import { DataSource, Repository } from 'typeorm'
import CreateReviewDto from './dto/createReviewDto'
import { UpdateReviewDto } from './dto/updateReviewDto'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private datasource: DataSource
  ) {}

  async findReviewByEventID(eventId: number) {
    return await this.reviewRepository.find({
      where: { eventId: eventId, isDeleted: 'N' },
    })
  }

  async findReviewByUserId(userId: number) {
    return await this.reviewRepository.find({
      where: { reviewerId: userId, isDeleted: 'N' },
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

  /*
   * @param reviewId
   * @param userId
   * @param updateReviewDto
   * */
  async update(
    reviewId: number,
    userId: number,
    updateReviewDto: UpdateReviewDto
  ) {
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.connect() //connection pool에서 connection을 가져옵니다.
    await queryRunner.startTransaction()
    try {
      await queryRunner.manager.update(
        Review, //업데이트할 테이블
        { reviewId: reviewId, reviewerId: userId }, //조건
        updateReviewDto //업데이트할 partial 객체
      )
      await queryRunner.commitTransaction() //성공시 commit
    } catch (err) {
      await queryRunner.rollbackTransaction() //실패시 rollback
    } finally {
      await queryRunner.release() //connection pool에 반환
    }
  }

  async remove(reviewId: number, userId: number) {
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.connect() //connection pool에서 connection을 가져옵니다.
    await queryRunner.startTransaction()
    try {
      await queryRunner.manager.softDelete(Review, {
        reviewId: reviewId,
        reviewerId: userId,
      })
      await queryRunner.manager.update(
        Review,
        { reviewId: reviewId },
        { isDeleted: 'Y' }
      )
      await queryRunner.commitTransaction() //성공시 commit
    } catch (err) {
      await queryRunner.rollbackTransaction() //실패시 rollback
    } finally {
      await queryRunner.release() //connection pool에 반환
    }
  }
}
