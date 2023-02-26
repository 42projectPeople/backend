import { Injectable } from '@nestjs/common'
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entity/User.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async logIn(email: string, response: Response) {
    // find matched email from User table
    const user: User = await this.userRepository.findOne({
      where: {
        userName: email,
      },
    })
    if (user === undefined || user === null) {
      // login failed
    } else {
      const userId = user.userId
      // success login
      // set JWT to cookie.
      // set session (CleanUp session and add new refresh token to session)
    }
  }
  async signUp(email: string) {
    // find matched email from User table
    const user: User = await this.userRepository.findOne({
      where: {
        userName: email,
      },
    })
    if (user === undefined || user === null) {
      // add new user to User table
      await this.userRepository.save(new User())
    } else {
      // it's already exist user -> throw error
    }
    // find matched email from User table
    // if already exists -> already exists / else, add it
  }
}
