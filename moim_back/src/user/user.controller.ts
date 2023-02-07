import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
  Post,
  BadRequestException,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/updateUserDto'
import { CreateUserDto } from './dto/createUserDto'
import { User } from '../entity/User.entity'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * RESTRICTED: any user
   * Create new user
   * @param createUserDto
   */
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    // TODO: check user is already exists
    if (await this.userService.checkExistUser(createUserDto)) {
      throw new BadRequestException() // FIXME:  We need to return a value that notifies us if the user has already been created.
    } else {
      await this.userService.create(createUserDto)
    }
  }

  /**
   * RESTRICTED: any user
   * check user name is already exists
   * @param userNickName
   */
  @Post('verify/nickname/:userNickName')
  async checkValidUserNickName(@Param('userNickName') userNickName: string) {}

  /**
   * RESTRICTED: login user
   * get user information from db
   * @param userID
   */
  @Get(':userID')
  async getUser(@Param('userID') userID: string) {
    return await this.userService.find(+userID)
  }

  /**
   * RESTRICTED: admin user
   * TODO: Check user role
   * to show exist user on db. it will send you by 10 users per page
   */
  @Get()
  async getUsers(@Param('page') page: number) {
    return await this.userService.getUserByPage(page)
  }

  /**
   * RESTRICTED: login user && userid == login user
   * update user information in db
   * @param userID
   * @param updateUserDto
   */
  @Patch(':userID')
  async updateUserInfo(
    @Param('userID') userID: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    await this.userService.update(+userID, updateUserDto)
  }
}
