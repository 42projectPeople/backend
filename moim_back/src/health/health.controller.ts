import { Controller, Get, HttpStatus, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('health')
export class HealthController {
  /*
   * @param response object
   * default healthcheck controller for LOADBALANCER
   * */
  @Get()
  getHealth(@Res() res: Response) {
    res.status(HttpStatus.OK).json([])
  }
}
