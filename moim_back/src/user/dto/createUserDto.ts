import { IsByteLength, IsString, IsUrl } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '../../entity/User.entity'

export class CreateUserDto {
  @ApiProperty({
    description: 'user의 고유한 name',
  })
  @IsString()
  @IsByteLength(2, 35)
  userName: string

  @ApiProperty({
    description: 'user nickname',
  })
  @IsString()
  @IsByteLength(2, 35)
  userNickName: string

  @ApiProperty({
    description: 'user 프로필 사진 url',
  })
  @IsUrl()
  @IsByteLength(10, 100)
  userProfilePhoto: string
  @ApiProperty({
    description: 'user 가 자신을 소개하는 짧은 글',
  })
  @IsString()
  @IsByteLength(0, 200)
  userTitle: string

  /**
   * DTO to entity
   * @param createReviewDto
   */
  static toEntity(createReviewDto: CreateUserDto): User {
    const user = new User()
    user.userName = createReviewDto.userName
    user.userNickName = createReviewDto.userNickName
    user.userTitle = createReviewDto.userTitle
    return user
  }
}
