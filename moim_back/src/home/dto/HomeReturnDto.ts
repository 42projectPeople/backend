import { ApiProperty } from '@nestjs/swagger'

export interface summaryEvent {
  eventId: number
  eventImage: string
  eventTitle: string
  eventAddress: string
}
export class HomeReturnDto {
  @ApiProperty({
    description: 'summaryEvents개체',
    example:
      'eventId:1, eventImage: URL, eventTitle: string, eventAddress: string',
  })
  events: summaryEvent[]
}
