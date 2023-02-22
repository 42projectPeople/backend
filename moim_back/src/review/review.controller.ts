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
  HttpCode,
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { ControllerUpdateReviewDto } from './dto/controllerUpdateReview.Dto'
import CreateReviewDto from './dto/createReview.dto'
import { ServiceUpdateReviewDto } from './dto/serviceUpdateReview.dto'
import {
  ApiOkResponse,
  ApiOperation,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiBody,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Review } from 'src/entity/Review.entity'
import { ServiceDeleteReviewDto } from './dto/serviceDeleteReview.dto'

@Controller('review')
@ApiTags('review api')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/event/:eventId')
  @ApiOperation({
    summary: 'get reviews by eventId',
    description: 'get reviews by event',
  })
  @ApiOkResponse({
    description: 'Get Success',
  })
  async getReviewByEventId(
    @Param('eventId') eventId: string
  ): Promise<Review[]> {
    return await this.reviewService.findReviewByEventID(+eventId)
  }

  @Get('/userId/:user')
  @ApiOperation({
    summary: 'get reviews by userId',
    description: 'get reviews by user',
  })
  @ApiOkResponse({
    description: 'Get Success',
  })
  async getReviewByUserId(@Param('userId') userId: string) {
    return await this.reviewService.findReviewByUserId(+userId)
  }

  @Post('/')
  @ApiOperation({
    summary: 'create new review',
    description: 'create review',
  })
  @ApiOkResponse({
    description: 'created',
  })
  @ApiConflictResponse({
    description: 'too fast',
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error',
  })
  @ApiBody({
    type: CreateReviewDto,
  })
  @HttpCode(200)
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
  @ApiOperation({
    summary: 'update review',
    description: 'update review',
  })
  @ApiUnauthorizedResponse({
    description: 'unauthorized',
  })
  @ApiOkResponse({
    description: 'updated',
  })
  @ApiInternalServerErrorResponse({
    description: 'database server error',
  })
  @HttpCode(200)
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
    @Body() controllerUpdateReviewDto: ControllerUpdateReviewDto
  ) {
    /*
     * if (req.session.userId != controllerUpdateReviewDto.reviewerId)
     * 	throw new ForbiddenException()
     * */
    const userId = 1 //req.session.userId
    return this.reviewService.update(
      new ServiceUpdateReviewDto(controllerUpdateReviewDto, +reviewId, userId) //서비스 레이어 dto 생성
    )
  }

  @Delete(':reviewId')
  @ApiOperation({
    summary: 'delete review',
    description: 'delete review',
  })
  @ApiUnauthorizedResponse({
    description: 'unauthorized',
  })
  @ApiOkResponse({
    description: 'delete success',
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error',
  })
  @ApiNotFoundResponse({
    description: 'requested review not found',
  })
  @HttpCode(200)
  //need session guard
  deleteReview(@Param('reviewId') reviewId: string) {
    const userId = 1 //req.session.userId, or jwt
    return this.reviewService.remove(
      new ServiceDeleteReviewDto(+reviewId, userId)
    )
  }
}
