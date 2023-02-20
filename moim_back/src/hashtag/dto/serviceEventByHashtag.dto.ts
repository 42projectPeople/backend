import { controllerEventByHashtagIdDto } from './controllerEventByHashtagId.dto'

export class serviceEventByHashtagDto extends controllerEventByHashtagIdDto {
  private readonly hashtagId: number

  constructor(parent: controllerEventByHashtagIdDto, hashtagId: number) {
    super(parent.page, parent.recommendation)
    this.hashtagId = hashtagId
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
}
