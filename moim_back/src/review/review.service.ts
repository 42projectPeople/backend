import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Review } from 'src/entity/Review.entity'
import { DataSource, Repository } from 'typeorm'
import { UpdateReviewDto } from './dto/UpdateReview.dto'
import CreateReviewDto from './dto/createReview.dto'
import {
  ServiceGetReviewByEventId,
  ServiceGetReviewByUserId,
} from './dto/ServiceGetReview.dto'
import { PaginationDto } from './dto/Pagination.dto'
import { GetReviewByHostIdDto } from './dto/GetReviewByHostId.dto'
import { Event } from 'src/entity/Event.entity'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private datasource: DataSource
  ) {}

  async findReviewByEventID(serviceDto: ServiceGetReviewByEventId) {
    try {
      const qb = this.reviewRepository
        .createQueryBuilder('r')
        .innerJoin('r.eventId', 'e', 'e.eventId = r.eventId')
        .innerJoinAndSelect('r.reviewerId', 'u', 'u.userId = r.reviewerId')
        .select([
          'r.reviewId',
          'r.createdAt',
          'r.modifiedAt',
          'r.likes',
          'r.content',
          'r.reviewerId',
          'u.userId',
          'u.userName',
          'u.userNickName',
          'u.userProfilePhoto',
          'u.userLevel',
        ])
        .where("r.eventId = :id AND r.isDeleted = 'N'", {
          id: serviceDto.getEventId(),
        })
        .offset(serviceDto.getStartIndex())
        .limit(serviceDto.getPageSize())
      return await qb.getMany()
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async findReviewByUserId(
    serviceDto: ServiceGetReviewByUserId
  ): Promise<Review[]> {
    const qb = this.reviewRepository.createQueryBuilder('r')
    try {
      const query = qb
        .innerJoinAndSelect('r.reviewerId', 'u', 'u.userId = r.reviewerId')
        .select([
          'r.reviewId',
          'r.createdAt',
          'r.modifiedAt',
          'r.likes',
          'r.content',
          'r.reviewerId',
          'u.userId',
          'u.userName',
          'u.userNickName',
          'u.userProfilePhoto',
          'u.userLevel',
        ])
        .where("r.reviewerId = :id AND r.isDeleted = 'N'", {
          id: serviceDto.getUserId(),
        })
        .offset(serviceDto.getStartIndex())
        .limit(serviceDto.getPageSize())
      return await query.getRawMany()
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async findReviewByHostId(
    getReviewByHostId: GetReviewByHostIdDto,
    hostId: number
  ): Promise<Review[]> {
    const qb = this.eventRepository.createQueryBuilder('e')
    try {
      const query = qb
        .innerJoinAndSelect('e.reviewIds', 'r')
        .where('e.hostId = :hostId', { hostId: hostId })

      if (getReviewByHostId.sortByEventDate)
        query.addOrderBy('e.eventDate', 'DESC')
      if (getReviewByHostId.sortByEventRating)
        query
          .addOrderBy('e.rating', 'DESC')

          .offset((getReviewByHostId.page - 1) * getReviewByHostId.pageSize)
          .limit(getReviewByHostId.page)
      return await query.getRawMany()
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async create(
    createReviewDto: CreateReviewDto,
    userId: number
  ): Promise<void> {
    try {
      await this.reviewRepository
        .createQueryBuilder()
        .insert()
        .into(Review)
        .values(CreateReviewDto.toEntity(createReviewDto, userId))
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
  async update(
    updateReviewDto: UpdateReviewDto,
    reviewId: number,
    userId: number
  ) {
    const queryRunner = this.datasource.createQueryRunner()
    try {
      await queryRunner.connect() //connection pool에서 connection을 가져옵니다.
      await queryRunner.startTransaction()
      //내용 업데이트
      const queryResult = await queryRunner.manager.update(
        Review, //업데이트할 테이블
        {
          reviewId: reviewId,
          reviewerId: userId,
        }, //조건
        { content: updateReviewDto.getContent() }
        //업데이트할 partial 객체
      )

      if (queryResult.affected == 0)
        throw new NotFoundException('업데이트 할 리뷰가 없습니다.')

      await queryRunner.commitTransaction() //성공시 commit
    } catch (err) {
      await queryRunner.rollbackTransaction() //실패시 rollback
      if (err.status === 404) throw err
      if (err.status === 500) throw new InternalServerErrorException()
    } finally {
      await queryRunner.release() //connection pool에 반환
    }
  }

  /*
   * @param reviewId: from url
   * @param userId: from jwt token
   * */
  async remove(reviewId: number, userId: number): Promise<void> {
    const queryRunner = this.datasource.createQueryRunner()
    try {
      await queryRunner.connect() //connection pool에서 connection을 가져옵니다.
      await queryRunner.startTransaction()

      const queryResult = await queryRunner.manager.update(
        Review,
        {
          reviewId: reviewId,
          reviewerId: userId,
        },
        { isDeleted: 'Y', deletedAt: 'Date.now()' } //isDeleted
      )

      //check if not affected
      if (queryResult.affected == 0)
        throw new NotFoundException('삭제할 리뷰가 없습니다.')

      await queryRunner.commitTransaction() //성공시 commit
    } catch (err) {
      await queryRunner.rollbackTransaction() //실패시 rollback
      if (err.status === 404) throw err
      if (err.status === 500) throw new InternalServerErrorException()
    } finally {
      await queryRunner.release() //connection pool에 반환
    }
  }
}
