import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entity/User.entity'
import { DataSource, Repository } from 'typeorm'
import { UpdateUserRequestDto } from './dto/updateUserRequestDto'
import { CreateUserRequestDto } from './dto/createUserRequestDto'
import { RegisterEventRequestDto } from './dto/registerEventRequestDto'
import { User_Events } from '../entity/User_Events.entity'
import { UnregisterEventRequestDto } from './dto/unregisterEventRequestDto'
import { Event } from '../entity/Event.entity'
import { GetUserEventDto } from './dto/getUserEvents.dto'

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
        .set(new User(userInfo))
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

  async findAllUserHostEvent(
    userId: number,
    userEventDto: GetUserEventDto
  ): Promise<Event[]> {
    const qb = this.eventRepository.createQueryBuilder('e')

    try {
      const query = qb.select().where('e.hostId = :id', { id: userId })

      if (userEventDto.sortByViews) query.addOrderBy('views', 'DESC')
      if (userEventDto.sortByEventStartDate)
        query.addOrderBy('eventDate', 'ASC')
      if (!userEventDto.includeEndEvent) query.andWhere('eventDate > CURDATE()')

      query
        .offset((userEventDto.page - 1) * userEventDto.pageSize)
        .limit(userEventDto.pageSize)

      return await query.getRawMany()
    } catch (err) {
      throw new InternalServerErrorException('database server error')
    }
  }

  async findAllUserGuestEvent(
    userId: number,
    userEventDto: GetUserEventDto
  ): Promise<Event[]> {
    const qb = this.eventRepository.createQueryBuilder('e')

    try {
      const query = qb
        .leftJoin(
          'user_events',
          'user_events',
          'user_events.eventId = e.eventId'
        )
        .where(
          'user_events.userId = :userId and user_events.deletedAt is null',
          { userId }
        )

      if (userEventDto.sortByViews) query.addOrderBy('views', 'DESC')
      if (userEventDto.sortByEventStartDate)
        query.addOrderBy('eventDate', 'ASC')
      if (!userEventDto.includeEndEvent) query.andWhere('eventDate > CURDATE()')

      query
        .offset((userEventDto.page - 1) * userEventDto.pageSize)
        .limit(userEventDto.pageSize)

      return await query.getRawMany()
    } catch (err) {
      throw new InternalServerErrorException('database server error')
    }
  }

  async registerEvent(
    userId: number,
    registerEventDto: RegisterEventRequestDto
  ): Promise<void> {
    const queryRunner = await this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      await queryRunner.manager
        .createQueryBuilder()
        .setLock('pessimistic_write')
        .update(Event)
        .set({ curParticipant: () => `"curParticipant" + 1` })
        .where('eventId = :eventId', { eventId: registerEventDto.eventId })
        .execute()
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(User_Events)
        .values(registerEventDto) // TODO: CHECK THIS CODE IS VALID OR NOT
        .execute()
      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException('database server error')
    } finally {
      await queryRunner.release()
    }
  }

  async unregisterEvent(
    userId: number,
    unregisterEventDto: UnregisterEventRequestDto
  ): Promise<void> {
    const queryRunner = await this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    queryRunner.manager
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .setLock('pessimistic_write')
        .update(Event)
        .set({ curParticipant: () => `"curParticipant" - 1` })
        .where('eventId = :eventId', { eventId: unregisterEventDto.eventId })
        .execute()
      await queryRunner.manager
        .createQueryBuilder()
        .setLock('pessimistic_write')
        .from(User_Events, 'user_events')
        .softDelete()
        .where(
          'user_events.eventId = :eventId AND user_events.userId = :userId AND user_events.deletedAt is NULL',
          {
            userId: userId,
            eventId: unregisterEventDto.eventId,
          }
        )
        .execute()

      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException('database server error')
    } finally {
      await queryRunner.release()
    }
  }
}
