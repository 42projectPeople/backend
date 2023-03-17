import { IsNumber, IsString } from 'class-validator'

export class EventCreateDto {
  @IsString()
  main_image: string

  @IsString()
  content: string

  @IsString()
  location: string

  @IsNumber()
  latitude: number

  @IsNumber()
  longitude: number

  @IsString()
  header: string

  @IsNumber()
  maxParticipant: number

  @IsNumber()
  curParticipant: number

  @IsNumber()
  host: number

  @IsNumber()
  hashtag: number
}
