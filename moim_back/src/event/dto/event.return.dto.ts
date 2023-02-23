import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

export class EventHostToReturnDto {
  @IsNumber()
  hostId: number

  @IsString()
  hostNickName: string | '닉네임읆 만들어주세요.'

  hostRole: boolean | string

  @IsString()
  hostProfilePhoto: string | null

  @IsString()
  hostTitle: string | '소개글을 작성해주세요.'
}

export class EventReturnDto {
  @IsNumber()
  eventId: number
  @IsString()
  eventDate: string
  @IsString()
  event_modifiedAt: string | Date
  @IsString()
  event_main_image: string
  @IsString()
  event_content: string
  @IsNumber()
  event_views: number
  @IsString()
  event_location: string
  @IsNumber()
  event_latitude: number
  @IsNumber()
  event_longitude: number
  @IsString()
  event_header: string
  @IsNumber()
  event_rating: number
  @IsNumber()
  event_maxParticipant: number
  @IsNumber()
  event_curParticipant: number
  @IsNumber()
  @IsNotEmpty()
  hashtagId: number
  @IsString()
  @IsNotEmpty()
  hashtagName: string
  @IsNumber()
  hostId: number
  @IsString()
  hostNickName: string | '닉네임읆 만들어주세요.'
  hostRole: boolean | string
  @IsString()
  hostProfilePhoto: string | null
  @IsString()
  hostTitle: string | '소개글을 작성해주세요.'
}
