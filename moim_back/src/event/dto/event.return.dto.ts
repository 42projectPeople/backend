import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class EventReturnDto {
  @IsString()
  userNickName: string

  @IsString()
  userProfilePhoto: string

  @IsNumber()
  userLevel: number

  @IsString()
  userTitle: string

  @IsNumber()
  eventId: number

  @IsNotEmpty()
  modifiedAt: Date

  @IsString()
  eventDate: string

  @IsString()
  main_image: string

  @IsString()
  content: string

  @IsString()
  views: string

  @IsString()
  location: string

  @IsNumber()
  latitude: number

  @IsNumber()
  longitude: number

  @IsString()
  header: string

  @IsNumber()
  rating: number

  @IsNumber()
  maxParticipant: number

  @IsNumber()
  curParticipant: number

  @IsString()
  hashtagName: string
}
