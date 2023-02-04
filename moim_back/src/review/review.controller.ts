import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common'
import { ReviewService } from './review.service'
import CreateReviewDto from './dto/createReviewDto'
import { UpdateReviewDto } from './dto/updateReviewDto'
import { DeleteReviewDto } from './dto/deleteReviewDto'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/event/:eventId')
  async getReviewByEventId(@Param('eventId') eventId: string) {
    return await this.reviewService.findReviewByEventID(+eventId)
  }

  @Get('/userId/:user')
  async getReviewByUserId(@Param('userId') userId: string) {
    return await this.reviewService.findReviewByUserId(+userId)
  }

  @Post('/')
  //need session guard
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createReviewDto: CreateReviewDto) {
    /*
     * if (req.user.userId != createReviewDto.reviewerId)
     * 	throw new ForbiddenException('Forbidden access')
     * */
    await this.reviewService.create(createReviewDto)
  }

  @Patch(':reviewId')
  //need session guard
  @UsePipes(
    new ValidationPipe({
      transform: true, //지정된 객체로 자동변환
      whitelist: true, //수신돼선 안되는 속성 필터링
    })
  )
  async patchReview(
    @Param('reviewId') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    /*
     * if (req.user.userId != updateReviewDto.reviewerId)
     *	throw new ForbiddenException('FOrbidden access')
     * */
    return this.reviewService.update(+reviewId, updateReviewDto)
  }

  @Delete(':reviewId')
  //need session guard
  @UsePipes(
    new ValidationPipe({
      transform: true, //지정된 객체로 자동변환
      whitelist: true, //수신돼선 안되는 속성 필터링
    })
  )
  deleteReview(
    @Param('reviewId') reviewId: string,
    @Body() deleteReviewDto: DeleteReviewDto
  ) {
    /*
     * if (req.user.userId != deleteReviewDto.reviewerId)
     * 	throw new ForbiddenException('forbidden access');
     * */
    return this.reviewService.remove(+reviewId)
  }
}
