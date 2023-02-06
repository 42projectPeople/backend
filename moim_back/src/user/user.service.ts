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

  async find(userId: number) {
    return await this.userRepository.find({
      where: { userId: userId },
    })
  }

  async update(userId: number, userInfo: UpdateUserDto) {
    try {
      await this.userRepository
        .createQueryBuilder()
        .update()
        .set({
          userName: userInfo.userName,
          userNickName: userInfo.userNickName,
          userTitle: userInfo.userTitle,
          userProfilePhoto: userInfo.userProfilePhoto,
        })
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
}
