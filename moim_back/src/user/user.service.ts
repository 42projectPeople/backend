import {
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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
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

  async registerEvent(userId: number, registerEventDto: RegisterEventDto) {
    // register event
    try {
      await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User_Events)
        .values({
          participantId: userId,
          eventId: registerEventDto.eventId,
          userId: userId,
        })
        .execute()
    } catch (err) {
      // catch conflict error

      throw new InternalServerErrorException('database server error')
    }
  }
  async unregisterEvent(userId: number, registerEventDto: RegisterEventDto) {
    // unregister event
  }
}
