import { Controller, Get, Query } from '@nestjs/common'
import { MapService } from './map.service'
import { GetCoordinationRequestDto } from './dto/getCoordinationRequestDto'
import { GetCoordinationResponseDto } from './dto/getCoordinationResponse.dto'
import { SearchPlaceRequestDto } from './dto/searchPlaceRequest.dto'

@Controller('map')
export class MapController {
  constructor(private mapService: MapService) {}

  @Get('/search')
  async searchPlace(@Query() query: SearchPlaceRequestDto) {
    return await this.mapService.searchPlace(query)
  }

  @Get('/coordination')
  async getCoordination(
    @Query() query: GetCoordinationRequestDto
  ): Promise<GetCoordinationResponseDto | void> {
    return await this.mapService.getLocation(query)
  }
}
