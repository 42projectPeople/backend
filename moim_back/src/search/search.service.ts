import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Hashtag } from 'src/entity/Hashtag.entity'
import { User } from 'src/entity/User.entity'
import { Event } from 'src/entity/Event.entity'
import { Repository } from 'typeorm'
import { UserSearchDto } from './dto/UserSearch.dto'
import { EventSearchDto } from './dto/EventSearch.dto'
import { HashtagSearchDto } from './dto/HashtagSearch.dto'

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Event)
    private eventRepository: Repository<Event>,

    @InjectRepository(Hashtag)
    private hashtagRepo: Repository<Hashtag>
  ) {}

  async searchUser(userSearchDto: UserSearchDto) {
    const qb = this.userRepository.createQueryBuilder('u')
    try {
      const query = qb.where('u.userNickName LIKE :word', {
        word: '%' + userSearchDto.getWord() + '%',
      })

      if (userSearchDto.getSortByLevel() === true)
        query.addOrderBy('userLevel', 'DESC')
      if (userSearchDto.getSortByName() === true)
        query.addOrderBy('userName', 'DESC')
      query
        .offset(userSearchDto.getStartIndex())
        .limit(userSearchDto.getPageSize())
      return await query.execute()
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async searchEvent(eventSearchDto: EventSearchDto) {
    const qb = this.eventRepository.createQueryBuilder('e')
    try {
      const query = qb.where('e.header LIKE :word', {
        word: '%' + eventSearchDto.getWord() + '%',
      })

      //날짜순 정렬
      if (eventSearchDto.getSortByDate() === true)
        query.addOrderBy('e.eventDate', 'DESC')

      //뷰 수에따른 정렬
      if (eventSearchDto.getSortByViews() === true)
        query.addOrderBy('e.views', 'DESC')

      //이벤트 rating순으로 정렬하는 조건
      if (eventSearchDto.getSortByRating() === true)
        query.addOrderBy('e.rating', 'DESC')

      //정원이 다 찬 이벤트는 검색하지 않는 조건
      if (eventSearchDto.getIncludeMax() === false)
        query.andWhere('e.curParticipant < e.maxParticipant')

      if (
        eventSearchDto.getLocRange() != null &&
        eventSearchDto.getLatitude() != null &&
        eventSearchDto.getLongitude() != null
      ) {
        query.andWhere(
          'ST_DISTANCE_SPHERE(point, POINT(:long, :lat)) <= :locRange',
          {
            //사용자의 현재 위도경도
            long: eventSearchDto.getLongitude(),
            lat: eventSearchDto.getLatitude(),
            locRange: eventSearchDto.getLocRange(),
          }
        )
      }

      //페이지네이션
      query
        .offset(eventSearchDto.getStartIndex())
        .limit(eventSearchDto.getPageSize())

      return await query.execute()
    } catch (e) {
      console.log(e.errno)
      throw new InternalServerErrorException()
    }
  }

  async searchHashtag(hashtagSearchDto: HashtagSearchDto) {
    const qb = this.hashtagRepo.createQueryBuilder('h')
    try {
      const query = qb.where('h.hashtagName LIKE :word', {
        word: '%' + hashtagSearchDto.getWord() + '%',
      })

      query
        .offset(hashtagSearchDto.getStartIndex())
        .limit(hashtagSearchDto.getPageSize())

      return await query.execute()
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }
}
