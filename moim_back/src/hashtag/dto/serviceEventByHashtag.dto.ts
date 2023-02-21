import { controllerEventByHashtagIdDto } from './controllerEventByHashtagId.dto'

/*
 * dto 간 상속?
 * 해당 dto에 추후 확장가능성이 있는가?
 * */
export class serviceEventByHashtagDto {
  private readonly page: number
  private readonly recommendation: boolean
  private readonly pageSize: number
  private readonly hashtagId: number

  constructor(controllerDto: controllerEventByHashtagIdDto, hashtagId: number) {
    this.page = controllerDto.page
    this.recommendation = controllerDto.recommendation ?? false
    this.pageSize = controllerDto.pageSize ?? 10
    this.hashtagId = hashtagId
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

  getHashtagId(): number {
    return this.hashtagId
  }

  getStartIndex(): number {
    return this.page * this.pageSize
  }
}
