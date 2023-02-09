import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Res,
  HttpStatus,
  Query,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/updateUserDto'
import { CreateUserDto } from './dto/createUserDto'
import { User } from '../entity/User.entity'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { Users } from './utils/Users.type'
import { RegisterEventDto } from './dto/registerEventDto'
import { UnregisterEventDto } from './dto/unregisterEventDto'

@Controller('user')
@ApiTags('user api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * RESTRICTED: any user
   * Create new user
   * @param createUserDto
   * @param res
   */
  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  @ApiOperation({ summary: 'user creation api', description: 'create user' })
  @ApiResponse({
    description: 'create user',
    type: null,
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.userService.createUser(createUserDto)
    res.status(HttpStatus.CREATED)
  }

  /**
   * RESTRICTED: any user
   * check user name is already exists
   * @param userNickName
   */
  @Get('verify/nickname/:userNickName')
  @ApiOperation({
    summary: 'check user nickname is valid',
    description: 'validate user nickname',
  })
  @ApiResponse({
    description: 'check valid nickname',
    type: Boolean,
  })
  async checkValidUserNickName(@Param('userNickName') userNickName: string) {
    return { isValid: await this.userService.checkExistNickname(userNickName) }
  }

  /**
   * RESTRICTED: login user
   * get user information from db
   * @param userID
   */
  @Get(':userID')
  @ApiOperation({
    summary: 'get user by user id',
    description: 'get user by user id',
  })
  @ApiResponse({
    description: 'get user by user id',
    type: User,
  })
  async getUserByUserId(@Param('userID') userID: string) {
    return await this.userService.findUserByUserId(+userID)
  }

  /**
   * RESTRICTED: admin user
   * TODO: Check user role
   * to show exist user on db. it will send you by 10 users per page
   */
  @Get()
  @ApiOperation({
    summary: 'get users by page',
    description: 'get users by userID. 10 users returned by 1 page',
  })
  @ApiResponse({
    description: 'get users by page',
    type: Users,
  })
  async getUsersByPage(@Query('page') page: number) {
    return { Users: await this.userService.findUsersByPage(page) }
  }

  /**
   * RESTRICTED: any user
   * find user by nickname
   * TODO: make service
   * @param userNickName
   */
  @Get('/nickname/:userNickName')
  @ApiOperation({
    summary: 'get user by nickname',
    description: 'get user by nickname',
  })
  @ApiResponse({
    description: 'get user by nickname',
    type: User,
  })
  async getUserByNickName(@Param('userNickName') userNickName: string) {
    return await this.userService.findUserByNickName(userNickName)
  }

  /**
   * RESTRICTED: login user && userid == login user
   * update user information in db
   * @param userID
   * @param updateUserDto
   * @param res
   */
  @Put(':userID')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  @ApiOperation({
    summary: 'update user',
    description: 'update user',
  })
  @ApiResponse({
    description: 'update user',
    type: null,
  })
  async updateUser(
    @Param('userID') userID: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.userService.updateUser(+userID, updateUserDto)
    res.status(HttpStatus.ACCEPTED)
  }

  /**
   * RESTRICTED: login user
   * TODO: implement services
   * @param userId
   */
  @Get(':userID/event')
  async getUserEvents(@Param('userID') userId: string) {
    return await this.userService.findAllUserEvent(+userId)
  }

  /**
   * RESTRICTED: login user
   * TODO: implement services
   * @param userId
   * @param registerEventDto
   */
  @Post(':userID/event')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async registerEvent(
    @Param('userID') userId: string,
    @Body() registerEventDto: RegisterEventDto
  ) {
    await this.userService.registerEvent(+userId, registerEventDto)
  }

  /**
   * RESTRICTED: login user
   * @param userId
   * @param unregisterEventDto
   */
  @Delete(':userID/event')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async unregisterEvent(
    @Param('userID') userId: string,
    @Body() unregisterEventDto: UnregisterEventDto
  ) {
    await this.userService.unregisterEvent(+userId, unregisterEventDto)
  }
}
