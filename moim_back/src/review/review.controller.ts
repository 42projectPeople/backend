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
import UpdateReviewDto from './dto/updateReviewDto'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':eventId')
  async getReviewByEventId(@Param('eventId') eventId: string) {
    return await this.reviewService.findReviewByEventID(+eventId)
  }

  @Post('/')
  //check logged in
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createReviewDto: CreateReviewDto) {
    await this.reviewService.create(createReviewDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id)
  }
}
