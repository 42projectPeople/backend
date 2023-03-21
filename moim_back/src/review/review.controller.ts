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
  UseGuards,
  Req,
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { UpdateReviewDto } from './dto/UpdateReview.Dto'
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
import { JWTAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard'
import { Request } from 'express'
import { GetReviewByHostIdDto } from './dto/GetReviewByHostId.dto'

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

  @Get('/user/host/:hostId')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async getReviewByHostId(
    @Param('hostId') hostId: string,
    @Query() getReviewByHostId: GetReviewByHostIdDto
  ): Promise<Review[]> {
    return await this.reviewService.findReviewByHostId(
      getReviewByHostId,
      +hostId
    )
  }

  @Post('/')
  @DocsPostReview()
  @UseGuards(JWTAuthGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async create(@Body() createReviewDto: CreateReviewDto, @Req() req: Request) {
    await this.reviewService.create(createReviewDto, req.user.userId)
  }

  @Patch(':reviewId')
  @DocsPatchReview()
  //need session guard
  @UseGuards(JWTAuthGuard)
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
    @Body() updateReviewDto: UpdateReviewDto,
    @Req() req: Request
  ) {
    return await this.reviewService.update(
      updateReviewDto,
      +reviewId,
      req.user.userId
    )
  }

  //@Delete(':reviewId')
  //@DocsDeleteReview()
  ////need session guard
  //async deleteReview(@Param('reviewId') reviewId: string) {
  //  const userId = 1 //jwt
  //  return await this.reviewService.remove(+reviewId, userId)
  //}
}
