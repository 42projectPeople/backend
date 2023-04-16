import { ApiProperty } from '@nestjs/swagger'
import { IsByteLength, IsNumber, ValidationError } from 'class-validator'
import { ReportType } from '../enum/ReportType.enum'
import { Transform } from 'class-transformer'

export class CreateReportDto {
  @ApiProperty({
    description: "무엇은 신고하는가?, USER: 'U', REVIEW: 'R', EVENT: 'E'",
    example: 'U',
  })
  @IsByteLength(1, 1)
  @Transform(({ value }) => {
    if (value === 'E') return ReportType.EVENT
    else if (value === 'R') return ReportType.REVIEW
    else if (value === 'U') return ReportType.USER
    else return new ValidationError()
  })
  reportType: ReportType

  @ApiProperty({
    description: '신고 내용 한글로 min 1, max 100',
    example: '신고 예시',
  })
  @IsByteLength(1, 300)
  content: string

  @ApiProperty({
    description: '신고할 ID',
    example: 5,
  })
  @IsNumber()
  idToBeReported: number
}
