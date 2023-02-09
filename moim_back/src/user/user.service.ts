import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entity/User.entity'
import { Repository } from 'typeorm'
import { UpdateUserDto } from './dto/updateUserDto'
import { CreateUserDto } from './dto/createUserDto'
import { RegisterEventDto } from './dto/registerEventDto'
import { User_Events } from '../entity/User_Events.entity'
import { UnregisterEventDto } from './dto/unregisterEventDto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(User_Events)
    private readonly userEventsRepository: Repository<User_Events>
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
        throw new NotAcceptableException('duplicated unique value')
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

  async findAllUserEvent(userId: number) {
    try {
      return await this.userEventsRepository.find({
        where: { userId: userId, deletedAt: null },
      })
    } catch (err) {
      throw new InternalServerErrorException('database server error')
    }
  }
  async registerEvent(userId: number, registerEventDto: RegisterEventDto) {
    // register event
    try {
      await this.userEventsRepository
        .createQueryBuilder('user_events')
        .insert()
        .into(User_Events)
        .values({
          eventId: registerEventDto.eventId,
          userId: userId,
        })
        .execute()
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('too fast')
      } else if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new BadRequestException('invalid key')
      } else {
        throw new InternalServerErrorException('database server error')
      }
    }
  }

  async unregisterEvent(
    userId: number,
    unregisterEventDto: UnregisterEventDto
  ) {
    console.log(userId)
    try {
      await this.userEventsRepository
        .createQueryBuilder('user_events')
        .softDelete()
        .where(
          'user_events.userId = :userId AND user_events.eventId = :eventId AND user_events.deletedAt is NULL',
          { userId: userId, eventId: unregisterEventDto.eventId }
        )
        .execute()
    } catch (err) {
      throw new InternalServerErrorException('database server error')
    }
  }
}
