import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { ReportService } from './report.service'
import { CreateReportDto } from './dto/createReport.dto'
import { ApiTags } from '@nestjs/swagger'
import { DocsPostReport } from './swagger/DocsPostReport.docs'
import { UsePipes, ValidationPipe } from '@nestjs/common'
import { JWTAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard'

@Controller('report')
@ApiTags('report api')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('')
  @DocsPostReport()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  // @UseGuards(JWTAuthGuard)
  create(@Body() createReportDto: CreateReportDto) {
    // const reporterId = user.userId
    const reporterId = 1
    return this.reportService.createReport(createReportDto, reporterId)
  }
}
