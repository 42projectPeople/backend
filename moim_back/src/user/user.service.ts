import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entity/User.entity'
import { DataSource, IsNull, Repository } from 'typeorm'
import { UpdateUserRequestDto } from './dto/updateUserRequestDto'
import { CreateUserRequestDto } from './dto/createUserRequestDto'
import { RegisterEventRequestDto } from './dto/registerEventRequestDto'
import { User_Events } from '../entity/User_Events.entity'
import { UnregisterEventRequestDto } from './dto/unregisterEventRequestDto'
import { Event } from '../entity/Event.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(User_Events)
    private readonly userEventsRepository: Repository<User_Events>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly dataSource: DataSource
  ) {}

  async findUserByUserId(userId: number): Promise<User> {
    if (userId < 1)
      throw new BadRequestException('user id must be larger than 1')
    return await this.userRepository.findOne({
      where: { userId: userId },
    })
  }

  async findUsersByPage(page: number): Promise<User[]> {
    if (page < 1)
      throw new BadRequestException('page number must be larger than 1')
    return await this.userRepository.find({
      skip: (page === undefined ? 1 : +page) * 10,
      take: 10,
    })
  }

  async findUserByNickName(userNickName: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { userNickName: userNickName },
    })
  }

  async updateUser(
    userId: number,
    userInfo: UpdateUserRequestDto
  ): Promise<void> {
    try {
      await this.userRepository
        .createQueryBuilder()
        .update()
        .set(userInfo)
        .where('userId = :id', { id: userId })
        .execute()
    } catch (err) {
      throw new InternalServerErrorException('database server error')
    }
  }

  async createUser(userInfo: CreateUserRequestDto): Promise<void> {
    try {
      await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(CreateUserRequestDto.toEntity(userInfo))
        .execute()
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('duplicated unique value')
      } else {
        throw new InternalServerErrorException('database server error')
      }
    }
  }

  async checkExistNickname(userNickName: string): Promise<boolean> {
    const info = await this.userRepository.find({
      where: { userNickName: userNickName },
    })
    return info.length === 0
  }

  async findAllUserHostEvent(userId: number): Promise<Event[]> {
    try {
      return await this.eventRepository.find({
        where: { host: userId },
      })
    } catch (err) {
      throw new InternalServerErrorException('database server error')
    }
  }

  async findAllUserGuestEvent(userId: number): Promise<Event[]> {
    try {
      return await this.eventRepository
        .createQueryBuilder()
        .leftJoin(
          'user_events',
          'user_events',
          'user_events.event_id = events.id'
        )
        .where(
          'user_events.user_id = :userId and user_events.deletedAt is null',
          { userId }
        )
        .getMany()
    } catch (err) {
      throw new InternalServerErrorException('database server error')
    }
  }

  /**
   * NOTE: query runner 를 사용할 경우 개발자에게 권한이 더 주어질 수 있음. (우선은 entityManager 활용함)
   * @param userId
   * @param registerEventDto
   */
  async registerEvent(
    userId: number,
    registerEventDto: RegisterEventRequestDto
  ): Promise<void> {
    const userEvents = new User_Events()

    userEvents.userId = userId
    userEvents.eventId = registerEventDto.eventId
    await this.dataSource.manager.transaction(async (entityManager) => {
      await entityManager.save(userEvents)
      await entityManager.increment(
        Event,
        { eventId: registerEventDto.eventId },
        'curParticipant',
        1
      )
    })
  }

  async unregisterEvent(
    userId: number,
    unregisterEventDto: UnregisterEventRequestDto
  ): Promise<void> {
    await this.dataSource.manager.transaction(async (entityManager) => {
      await entityManager.softDelete(User_Events, {
        userId: userId,
        eventId: unregisterEventDto.eventId,
        deletedAt: IsNull(),
      })
      await entityManager.decrement(
        Event,
        { eventId: unregisterEventDto.eventId },
        'curParticipant',
        1
      )
    })
  }
}
