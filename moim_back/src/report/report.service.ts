import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Report } from 'src/entity/Report.entity'
import { Repository } from 'typeorm'
import { CreateReportDto } from './dto/createReport.dto'

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    readonly reportRepository: Repository<Report>
  ) {}

  async createReport(createReportDto: CreateReportDto, reporterId: number) {
    const newReport = this.reportRepository.create(createReportDto)
    newReport.reporterId = reporterId
    return await this.reportRepository.save(newReport)
  }
}
