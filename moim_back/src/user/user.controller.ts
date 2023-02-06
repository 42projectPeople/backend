import { Controller, Get, Param, Body, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/updateUserDto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * RESTRICTED TO LOGIN USER
   * @param userID
   */
  @Get(':userID')
  async getUser(@Param('userID') userID: string) {
    return await this.userService.find(+userID)
  }

  /**
   * RESTRICTED TO LOGIN USER
   * update user information in db
   * @param userID
   * @param updateUserDto
   */
  @Patch(':userID')
  async updateUserInfo(
    @Param('userID') userID: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.userService.update(+userID, updateUserDto)
  }
}
