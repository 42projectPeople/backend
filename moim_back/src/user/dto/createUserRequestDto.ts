import {
  IsByteLength,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '../../entity/User.entity'

/**
 * user name 제약 조건을 만들기 위해서 일정한 양식을 만들어야함
 * email 이 아마 적당할듯.
 */
export class CreateUserRequestDto {
  @ApiProperty({
    description: 'user의 고유한 name (email)',
  })
  @IsString()
  @IsEmail()
  @IsByteLength(2, 35)
  readonly userName: string

  @ApiProperty({
    description: 'user nickname [A-Za-z0-9_가-힣]{2,35}',
  })
  @IsString()
  @IsByteLength(2, 35)
  @Matches(/^[A-Za-z0-9_가-힣]{2,35}$/) // alphanumeric + Korean only accepted
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
