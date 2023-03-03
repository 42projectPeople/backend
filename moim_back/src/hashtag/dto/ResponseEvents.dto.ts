import { Event } from '../../entity/Event.entity'
import { ApiProperty } from '@nestjs/swagger'

export class ResponseEventsDto {
  @ApiProperty({
    description: 'Event list',
    isArray: true,
    type: [Event],
    example: [
      {
        eventId: 19,
        createdAt: '2022-05-15T16:35:37.847Z',
        eventDate: '2023-02-12T04:40:36.000Z',
        modifiedAt: '2023-02-11T16:56:02.000Z',
        main_image:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/188.jpg',
        content: 'https://cooperative-lord.info',
        views: 5,
        location: '63057 Volkman Pine',
        latitude: -26.79,
        longitude: 41.32,
        header: 'nutritious',
        rating: 4,
        maxParticipant: 24,
        curParticipant: 1,
      },
      {
        eventId: 18,
        createdAt: '2015-08-30T05:34:29.778Z',
        eventDate: '2023-02-12T07:06:28.000Z',
        modifiedAt: '2023-02-11T15:23:34.000Z',
        main_image:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1024.jpg',
        content: 'https://fair-inn.org',
        views: 3,
        location: '3168 Maynard Mount',
        latitude: 25.83,
        longitude: -20.92,
        header: 'anguished',
        rating: 5,
        maxParticipant: 33,
        curParticipant: 0,
      },
      {
        eventId: 22,
        createdAt: '2019-08-24T08:15:04.467Z',
        eventDate: '2023-02-12T06:37:30.000Z',
        modifiedAt: '2023-02-11T05:15:53.000Z',
        main_image:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/937.jpg',
        content: 'http://twin-xylophone.org',
        views: 2,
        location: "113 O'Reilly Corner",
        latitude: -45.95,
        longitude: 50.24,
        header: 'lone',
        rating: 3,
        maxParticipant: 49,
        curParticipant: 5,
      },
    ],
  })
  readonly events: Event[]

  @ApiProperty({
    description: 'Event count',
    example: 3,
  })
  readonly counts: number

  constructor(events: Event[] = []) {
    this.events = events
    this.counts = events.length
  }
}
