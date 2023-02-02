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

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':eventId')
  async getReviewByEventId(@Param('eventId') eventId: string) {
    return await this.reviewService.findReviewByEventID(+eventId)
  }

  @Post('/')
  //need session guard
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createReviewDto: CreateReviewDto) {
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
    return this.reviewService.update(+reviewId, updateReviewDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id)
  }
}
