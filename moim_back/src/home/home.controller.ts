import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { JWTAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard'
import { HomeService } from './home.service'
import { DocsGetHome } from './swagger/DocsGetHomeByEvents'

@Controller('home')
@ApiTags('home api')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('')
  @DocsGetHome()
  // @UseGuards(JWTAuthGuard)
  async getHome(@Res() res: Response) {
    const result = await this.homeService.findHome()
    return res.status(HttpStatus.OK).send(result)
  }
}
