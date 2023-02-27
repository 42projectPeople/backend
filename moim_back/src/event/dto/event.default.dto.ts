import { IsNumber, IsString } from 'class-validator'
import { Event } from 'src/entity/Event.entity'

/*
  extends Event
  @9utty
*/
export class EventDefaultDto extends Event {
  /*
    toEntity 메서드 정의, event엔티티 객체로 반환합니다.
    @Param newEvent: 컨트롤러 Dto
    @Return Event entity object
   */
  static transEventDto(newEvent: EventDefaultDto) {
    const event = new Event()

    event.eventDate = newEvent.eventDate
    event.main_image = newEvent.main_image
    event.content = newEvent.content
    event.location = newEvent.location
    event.latitude = newEvent.latitude
    event.longitude = newEvent.longitude
    event.header = newEvent.header
    event.hashtag = newEvent.hashtag
    event.host = newEvent.host
    event.maxParticipant = newEvent.maxParticipant
    event.curParticipant = 0
    event.rating = 0

    return event
  }
}
