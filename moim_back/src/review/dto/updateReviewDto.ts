import { PickType } from '@nestjs/swagger'
import { RequestUpdateReviewDto } from './requestUpdateUserDto'

/*
 * used in service layer
 * */
export class UpdateReviewDto extends PickType(RequestUpdateReviewDto, [
  'content',
]) {
  constructor(requestUpdateReviewDto: RequestUpdateReviewDto) {
    super()
    this.content = requestUpdateReviewDto.content
  }
}
