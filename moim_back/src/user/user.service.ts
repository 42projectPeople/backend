import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entity/User.entity'
import { Repository } from 'typeorm'
import { UpdateUserDto } from './dto/updateUserDto'
import { CreateUserDto } from './dto/createUserDto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async find(userId: number): Promise<User[]> {
    return await this.userRepository.find({
      where: { userId: userId },
    })
  }

  async getUserByPage(page: number): Promise<User[]> {
    return await this.userRepository.find({
      skip: page * 10,
      take: 10,
    })
  }

  async update(userId: number, userInfo: UpdateUserDto) {
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

  async create(userInfo: CreateUserDto) {
    try {
      await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(CreateUserDto.toEntity(userInfo))
        .execute()
    } catch (err) {
      throw new InternalServerErrorException('database server error')
    }
  }

  async checkExistUser(userInfo: CreateUserDto): Promise<boolean> {
    // get user by name
    const info = await this.userRepository.find({
      where: { userName: userInfo.userName },
    })
    return info.length !== 0
  }
}
