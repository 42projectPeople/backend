import { controllerEventByHashtagIdDto } from './controllerEventByHashtagId.dto'

/*
 * dto 간 상속?
 * 해당 dto에 추후 확장가능성이 있는가?
 * */
export class serviceEventByHashtagDto {
  private readonly page: number
  private readonly recommendation: boolean
  private readonly sortByDate: boolean
  private readonly pageSize: number
  private readonly hashtagId: number

  constructor(controllerDto: controllerEventByHashtagIdDto, hashtagId: number) {
    this.page = controllerDto.page
    this.recommendation = controllerDto.recommendation
    this.pageSize = controllerDto.pageSize
    this.hashtagId = hashtagId
    this.sortByDate = controllerDto.sortByDate
  }

  getPageSize(): number {
    return this.pageSize
  }

  getPage(): number {
    return this.page
  }

  getRecommendation(): boolean {
    return this.recommendation
  }

  getSortByDate(): boolean {
    return this.sortByDate
  }

  getHashtagId(): number {
    return this.hashtagId
  }

  getStartIndex(): number {
    return (this.page - 1) * this.pageSize
  }
}
