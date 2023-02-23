import {
  IsBoolean,
  IsNotEmpty,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

export class EventUserToReturnDto {
  @IsNumberString()
  @IsNotEmpty()
  userId: number

  @IsString()
  userNickName: string | '닉네임읆 만들어주세요.'

  @IsBoolean()
  @IsNotEmpty()
  userRole: boolean

  @IsString()
  userProfilePhoto: string | null

  @IsString()
  userTitle: string | '소개글을 작성해주세요.'
}

export class EventHashtagToReturnDto {
  @IsNumberString()
  @IsNotEmpty()
  hashtagId: number
  @IsString()
  @IsNotEmpty()
  hashtagName: string
}

export class EventReturnDto {
  @IsNumberString()
  eventId: number
  @IsString()
  eventDate: string
  @IsString()
  modifiedAt: string
  @IsString()
  main_image: string
  @IsString()
  content: string
  @IsNumberString()
  views: number
  @IsString()
  location: string
  @IsNumberString()
  latitude: number
  @IsNumberString()
  longitude: number
  @IsString()
  header: string
  @IsNumberString()
  rating: number
  @IsNumberString()
  maxParticipant: number
  @IsNumberString()
  curParticipant: number
  @ValidateNested()
  @Type(() => EventUserToReturnDto)
  user: EventUserToReturnDto
  @ValidateNested()
  @Type(() => EventHashtagToReturnDto)
  hashtag: EventHashtagToReturnDto
}
