import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { User_Events } from 'src/entity/User_Events.entity'

export class CreateUserEventDto {
  @ApiProperty({
    description: '사용자 userId',
  })
  @IsNumber()
  userId: number

  @ApiProperty({
    description: '이벤트의 eventId',
  })
  @IsNumber()
  eventId: number

  static toEntity(createUserEventDto: CreateUserEventDto): User_Events {
    const newUserEvent = new User_Events() //새로 생성
    newUserEvent.eventId = createUserEventDto.eventId //대입
    newUserEvent.userId = createUserEventDto.userId
    return newUserEvent
  }
}
