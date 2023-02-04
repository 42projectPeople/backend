import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User_Events } from 'src/entity/User_Events.entity'
import { Repository } from 'typeorm'
import { CreateUserEventDto } from './dto/create-user-event.dto'
import { UpdateUserEventDto } from './dto/update-user-event.dto'

@Injectable()
export class UserEventsService {
  constructor(
    @InjectRepository(User_Events)
    private readonly userEventsRepository: Repository<User_Events>
  ) {}

  create(createUserEventDto: CreateUserEventDto) {
    return 'This action adds a new userEvent'
  }

  findAll() {
    return `This action returns all userEvents`
  }

  findOne(id: number) {
    return `This action returns a #${id} userEvent`
  }

  update(id: number, updateUserEventDto: UpdateUserEventDto) {
    return `This action updates a #${id} userEvent`
  }

  remove(id: number) {
    return `This action removes a #${id} userEvent`
  }
}
