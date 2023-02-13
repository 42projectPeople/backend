import { IsByteLength, IsOptional, IsString, IsUrl } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '../../entity/User.entity'

export class CreateUserRequestDto {
  @ApiProperty({
    description: 'user의 고유한 name',
  })
  @IsString()
  @IsByteLength(2, 35)
  readonly userName: string

  @ApiProperty({
    description: 'user nickname',
  })
  @IsString()
  @IsByteLength(2, 35)
  readonly userNickName: string

  @ApiProperty({
    description: 'user 프로필 사진 url',
  })
  @IsUrl()
  @IsByteLength(10, 100)
  @IsOptional()
  readonly userProfilePhoto: string
  @ApiProperty({
    description: 'user 가 자신을 소개하는 짧은 글',
  })
  @IsString()
  @IsByteLength(0, 200)
  readonly userTitle: string

  /**
   * DTO to entity
   * @param createReviewDto
   */
  static toEntity(createReviewDto: CreateUserRequestDto): User {
    const user = new User()
    user.userName = createReviewDto.userName
    user.userNickName = createReviewDto.userNickName
    user.userTitle = createReviewDto.userTitle
    user.userProfilePhoto = createReviewDto.userProfilePhoto
    return user
  }
}
