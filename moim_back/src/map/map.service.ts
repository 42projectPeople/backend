import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GetCoordinationResponseDto } from './dto/getCoordinationResponse.dto'
import { GetCoordinationRequestDto } from './dto/getCoordinationRequestDto'
import { SearchPlaceRequestDto } from './dto/searchPlaceRequest.dto'
import { SearchPlaceResponseDto } from './dto/searchPlaceResponse.dto'
import { Place } from './place.class'

@Injectable()
export class MapService {
  constructor(private configService: ConfigService) {
    this.NAVER_CLOUD_MAP_CLIENT_KEY = this.configService.get(
      'NAVER_CLOUD_MAP_CLIENT_KEY'
    )
    this.NAVER_CLOUD_MAP_SECRET_KEY = this.configService.get(
      'NAVER_CLOUD_MAP_SECRET_KEY'
    )
    this.NAVER_CLOUD_SEARCH_CLIENT_KEY = this.configService.get(
      'NAVER_CLOUD_SEARCH_CLIENT_KEY'
    )
    this.NAVER_CLOUD_SEARCH_SECRET_KEY = this.configService.get(
      'NAVER_CLOUD_SEARCH_SECRET_KEY'
    )
  }
  private readonly NAVER_CLOUD_MAP_CLIENT_KEY
  private readonly NAVER_CLOUD_MAP_SECRET_KEY
  private readonly NAVER_CLOUD_SEARCH_CLIENT_KEY
  private readonly NAVER_CLOUD_SEARCH_SECRET_KEY

  async searchPlace(
    query: SearchPlaceRequestDto
  ): Promise<SearchPlaceResponseDto | void> {
    const URL = `https://openapi.naver.com/v1/search/local.json?query=${query.keyword}&display=5&sort=random`
    try {
      const response = await fetch(URL, {
        headers: {
          'X-Naver-Client-Id': this.NAVER_CLOUD_SEARCH_CLIENT_KEY,
          'X-Naver-Client-Secret': this.NAVER_CLOUD_SEARCH_SECRET_KEY,
        },
      })
      const data = await response.json()
      if (data && data.items && data.items.length > 0) {
        const newPlaces: Place[] = []
        for (let i = 0; i < 5; ++i) {
          const tmp = data.items[i]
          const place: Place = {
            name: tmp.title.replace(/(<([^>]+)>)/gi, ''),
            address: tmp.roadAddress.replace(/(<([^>]+)>)/gi, ''),
          }
          newPlaces[i] = place
        }
        const ret: SearchPlaceResponseDto = {
          place1: newPlaces[0],
          place2: newPlaces[1],
          place3: newPlaces[2],
          place4: newPlaces[3],
          place5: newPlaces[4],
        }
        return ret
      } else {
        const ret: SearchPlaceResponseDto = {
          place1: undefined,
          place2: undefined,
          place3: undefined,
          place4: undefined,
          place5: undefined,
        }

        return ret
      }
    } catch (e) {
      throw new InternalServerErrorException('map api 오류')
    }
  }

  async getLocation(
    query: GetCoordinationRequestDto
  ): Promise<GetCoordinationResponseDto | void> {
    const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${query.address}`
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-NCP-APIGW-API-KEY-ID': this.NAVER_CLOUD_MAP_CLIENT_KEY,
          'X-NCP-APIGW-API-KEY': this.NAVER_CLOUD_MAP_SECRET_KEY,
        },
      })
      const data = await response.json()

      return {
        address: query.address,
        latitude: data.addresses[0].y,
        longitude: data.addresses[0].x,
      }
    } catch (e) {
      throw new InternalServerErrorException('map api 오류')
    }
  }
}
