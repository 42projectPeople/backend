import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Review } from 'src/entity/Review.entity'
import { DataSource, Repository } from 'typeorm'
import CreateReviewDto from './dto/createReview.dto'
import { ServiceDeleteReviewDto } from './dto/serviceDeleteReview.dto'
import { ServiceUpdateReviewDto } from './dto/serviceUpdateReview.dto'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private datasource: DataSource
  ) {}

  async findReviewByEventID(eventId: number): Promise<Review[]> {
    try {
      return await this.reviewRepository.find({
        where: { eventId: eventId, isDeleted: 'N' },
      })
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async findReviewByUserId(userId: number): Promise<Review[]> {
    try {
      return await this.reviewRepository.find({
        where: { reviewerId: userId, isDeleted: 'N' },
      })
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async create(createReviewDto: CreateReviewDto): Promise<void> {
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
      throw new InternalServerErrorException() //internal server error
    }
  }

  /*
   * udpate review comment
   * @param updateReviewDto
   * */
  async update(serviceUpdateReviewDto: ServiceUpdateReviewDto): Promise<void> {
    const queryRunner = this.datasource.createQueryRunner()
    try {
      await queryRunner.connect() //connection pool에서 connection을 가져옵니다.
      await queryRunner.startTransaction()
      const queryResult = await queryRunner.manager.update(
        Review, //업데이트할 테이블
        {
          reviewId: serviceUpdateReviewDto.getReviewId(),
          reviewerId: serviceUpdateReviewDto.getUserId(),
        }, //조건
        serviceUpdateReviewDto.getPartial()
        //업데이트할 partial 객체
      )

      //check if not affected
      if (queryResult.affected == 0) throw new NotFoundException()

      await queryRunner.commitTransaction() //성공시 commit
    } catch (err) {
      await queryRunner.rollbackTransaction() //실패시 rollback
      if (err.status === 404) throw new NotFoundException()
      if (err.status === 500) throw new InternalServerErrorException()
    } finally {
      await queryRunner.release() //connection pool에 반환
    }
  }

  async remove(serviceDeleteReviewDto: ServiceDeleteReviewDto): Promise<void> {
    const queryRunner = this.datasource.createQueryRunner()
    try {
      await queryRunner.connect() //connection pool에서 connection을 가져옵니다.
      await queryRunner.startTransaction()

      const queryResult = await queryRunner.manager.update(
        Review,
        {
          reviewId: serviceDeleteReviewDto.getReviewId(),
          reviewerId: serviceDeleteReviewDto.getUserId(),
        },
        { isDeleted: 'Y', deletedAt: 'Date.now()' } //isDeleted
      )

      //check if not affected
      if (queryResult.affected == 0) throw new NotFoundException()

      await queryRunner.commitTransaction() //성공시 commit
    } catch (err) {
      await queryRunner.rollbackTransaction() //실패시 rollback
    } finally {
      await queryRunner.release() //connection pool에 반환
    }
  }
}
