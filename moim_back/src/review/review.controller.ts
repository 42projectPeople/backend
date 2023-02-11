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
import { RequestUpdateReviewDto } from './dto/requestUpdateUserDto'

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
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, //수신돼선 안되는 속성 필터링
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
  //need session guard
  @UsePipes(
    new ValidationPipe({
      transform: true, //지정된 객체로 자동변환
      whitelist: true, //수신돼선 안되는 속성 필터링
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async patchReview(
    @Param('reviewId') reviewId: string,
    @Body() requestUpdateReviewDto: RequestUpdateReviewDto
  ) {
    /*
     * if (req.session.userId != requestUpdateReviewDto.reviewerId)
     * 	throw new ForbiddenException()
     * */
    const userId = 1 //req.session.userId
    return this.reviewService.update(
      +reviewId,
      userId, //조건문에서 사용할 userId
      new UpdateReviewDto(requestUpdateReviewDto) //서비스 레이어 dto 생성
    )
  }

  @Delete(':reviewId')
  //need session guard
  deleteReview(@Param('reviewId') reviewId: string) {
    const userId = 1 //req.session.userId
    return this.reviewService.remove(+reviewId, userId)
  }
}
