import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { UpdateReviewDto } from './dto/UpdateReview.dto'
import { ApiTags } from '@nestjs/swagger'
import CreateReviewDto from './dto/createReview.dto'
import { Review } from 'src/entity/Review.entity'
import { PaginationDto } from './dto/Pagination.dto'
import { DocsPatchReview } from './swagger/DocsPatchReview.docs'
import { DocsPostReview } from './swagger/DocsPostReview.docs'
import { DocsGetReviewByUserId } from './swagger/DocsGetReviewByUserId.docs'
import { DocsGetReviewByEventId } from './swagger/DocsGetReviewByEventId.docs'
import {
  ServiceGetReviewByEventId,
  ServiceGetReviewByUserId,
} from './dto/ServiceGetReview.dto'

@Controller('review')
@ApiTags('review api')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/event/:eventId')
  @DocsGetReviewByEventId()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async getReviewByEventId(
    @Param('eventId') eventId: string,
    @Query() paginationDto: PaginationDto
  ) {
    return await this.reviewService.findReviewByEventID(
      new ServiceGetReviewByEventId(paginationDto, +eventId)
    )
  }

  @Get('/user/:userId')
  @DocsGetReviewByUserId()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async getReviewByUserId(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto
  ): Promise<Review[]> {
    return await this.reviewService.findReviewByUserId(
      new ServiceGetReviewByUserId(paginationDto, +userId)
    )
  }

  @Post('/')
  @DocsPostReview()
  //need session guard
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async create(@Body() createReviewDto: CreateReviewDto) {
    /*
     * if (req.user.userId != createReviewDto.reviewerId)
     * 	throw new ForbiddenException('Forbidden access')
     * */
    await this.reviewService.create(createReviewDto)
  }

  @Patch(':reviewId')
  @DocsPatchReview()
  //need session guard
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async patchReview(
    @Param('reviewId') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    /*
     * if (req.session.userId != UpdateReviewDto.reviewerId)
     * 	throw new ForbiddenException()
     * */
    const userId = 1 //jwt user id
    return await this.reviewService.update(updateReviewDto, +reviewId, userId)
  }

  //@Delete(':reviewId')
  //@DocsDeleteReview()
  ////need session guard
  //async deleteReview(@Param('reviewId') reviewId: string) {
  //  const userId = 1 //jwt
  //  return await this.reviewService.remove(+reviewId, userId)
  //}
}
