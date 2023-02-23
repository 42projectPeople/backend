import { PaginationDto } from './Pagination.dto'

class PaginationBase {
  private readonly pageSize: number
  private readonly page: number
  private readonly startIndex: number

  constructor(page: number, pageSize: number) {
    this.pageSize = pageSize
    this.page = page
    this.startIndex = (this.page - 1) * this.pageSize
  }

  getStartIndex(): number {
    return this.startIndex
  }

  getPageSize(): number {
    return this.pageSize
  }

  getPage(): number {
    return this.page
  }
}

export class ServiceGetReviewByUserId extends PaginationBase {
  private readonly userId: number
  constructor(paginationMeta: PaginationDto, userId: number) {
    super(paginationMeta.page, paginationMeta.pageSize)
    this.userId = userId
  }

  getUserId(): number {
    return this.userId
  }
}

export class ServiceGetReviewByEventId extends PaginationBase {
  private readonly eventId: number
  constructor(paginationMeta: PaginationDto, eventId: number) {
    super(paginationMeta.page, paginationMeta.pageSize)
    this.eventId = eventId
  }

  getEventId(): number {
    return this.eventId
  }
}
