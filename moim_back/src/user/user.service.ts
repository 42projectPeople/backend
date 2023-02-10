import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entity/User.entity'
import { DataSource, IsNull, Repository } from 'typeorm'
import { UpdateUserDto } from './dto/updateUserDto'
import { CreateUserDto } from './dto/createUserDto'
import { RegisterEventDto } from './dto/registerEventDto'
import { User_Events } from '../entity/User_Events.entity'
import { UnregisterEventDto } from './dto/unregisterEventDto'
import { Event } from '../entity/Event.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(User_Events)
    private readonly userEventsRepository: Repository<User_Events>,
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    private readonly dataSource: DataSource
  ) {}

  async findUserByUserId(userId: number): Promise<User[]> {
    return await this.userRepository.find({
      where: { userId: userId },
    })
  }

  async findUsersByPage(page: number): Promise<User[]> {
    console.log(typeof page)
    return await this.userRepository.find({
      skip: +page * 10,
      take: 10,
    })
  }

  async findUserByNickName(userNickName: string): Promise<User[]> {
    return await this.userRepository.find({
      where: { userNickName: userNickName },
    })
  }

  async updateUser(userId: number, userInfo: UpdateUserDto) {
    try {
      const data = {}
      Object.keys(userInfo).forEach((key) => {
        data[key] = userInfo[key]
      })
      await this.userRepository
        .createQueryBuilder()
        .update()
        .set(data)
        .where('userId = :id', { id: userId })
        .execute()
    } catch (err) {
      throw new InternalServerErrorException('database server error')
    }
  }

  async createUser(userInfo: CreateUserDto) {
    try {
      await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(CreateUserDto.toEntity(userInfo))
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

  async findAllUserHostEvent(userId: number) {
    try {
      return await this.eventsRepository.find({
        where: { host: userId },
      })
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException('database server error')
    }
  }

  async findAllUserGuestEvent(userId: number) {
    try {
      return await this.userEventsRepository.find({
        where: { userId: userId, deletedAt: null },
      })
    } catch (err) {
      throw new InternalServerErrorException('database server error')
    }
  }

  /**
   * NOTE: query runner 를 사용할 경우 개발자에게 권한이 더 주어질 수 있음. (우선은 entityManager 활용함)
   * @param userId
   * @param registerEventDto
   */
  async registerEvent(userId: number, registerEventDto: RegisterEventDto) {
    // register event
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
    unregisterEventDto: UnregisterEventDto
  ) {
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
