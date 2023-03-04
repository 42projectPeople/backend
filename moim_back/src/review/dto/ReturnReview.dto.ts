import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { Review } from 'src/entity/Review.entity'
import { User } from 'src/entity/User.entity'

export default class ReturnReviews extends IntersectionType(
  OmitType(Review, ['eventId'] as const)
) {
  @ApiProperty({
    example: 1,
  })
  reviewId: number

  @ApiProperty({
    example: '2023-02-02T18:29:22.350Z',
  })
  createdAt: Date

  @ApiProperty({
    example: '2023-02-11T10:37:41.845Z',
  })
  modifiededAt: Date

  @ApiProperty({
    example: 2,
  })
  likes: number

  @ApiProperty({
    example: 'hello world',
  })
  content: string

  @ApiProperty({
    example: {
      userId: 10,
      userName: 'Melvin_Osinski@gmail.com',
      userNickName: 'Patsy Goodwin',
      userProfilePhoto:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/791.jpg',
      userLevel: 3.7,
    },
  })
  reviewerId: User
}
