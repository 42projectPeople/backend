import { Controller, Get, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * RESTRICTED TO LOGIN USER
   * @param userID
   */
  @Get(':userID')
  async getUser(@Param('userID') userID: string) {
    return await this.userService.getUserInfo(+userID);
  }
  @Get(':userID')
  async updateUserInfo(
    @Param('userID') userID: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUserInfo(+userID, updateUserDto);
  }
}
