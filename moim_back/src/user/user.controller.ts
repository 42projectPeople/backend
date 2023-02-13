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
  BadRequestException,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserRequestDto } from './dto/updateUserRequestDto'
import { CreateUserRequestDto } from './dto/createUserRequestDto'
import { User } from '../entity/User.entity'
import { EventData } from './utils/EventData'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Response } from 'express'
import { Users } from './utils/Users.type'
import { RegisterEventRequestDto } from './dto/registerEventRequestDto'
import { UnregisterEventRequestDto } from './dto/unregisterEventRequestDto'
import { CheckNickNameResponseDto } from './dto/checkNickNameResponseDto'

@Controller('user')
@ApiTags('user api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private setResponseStatus(res: Response, status: number) {
    res.status(status)
  }

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
    status: HttpStatus.CREATED,
    description: 'create user operation success',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'create user operation is failed by conflict request',
  })
  @ApiBody({
    type: CreateUserRequestDto,
    description: 'Create user data',
  })
  async createUser(
    @Body()
    createUserDto: CreateUserRequestDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    await this.userService.createUser(createUserDto)
    this.setResponseStatus(res, HttpStatus.CREATED)
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
    status: HttpStatus.OK,
    description: 'check valid nickname',
    type: CheckNickNameResponseDto,
  })
  async checkValidUserNickName(
    @Param('userNickName') userNickName: string
  ): Promise<CheckNickNameResponseDto> {
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
  @ApiParam({
    name: 'userID',
    description: 'user id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User information',
    type: User,
  })
  async getUserByUserId(@Param('userID') userID: string): Promise<User> {
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
  @ApiQuery({
    name: 'page',
    description: 'user list page',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '10 User list by page',
    type: Users,
  })
  async getUsersByPage(@Query('page') page: number): Promise<Users> {
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
  @ApiParam({
    name: 'user nick name',
    description: 'user nickname',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get user by nickname',
    type: User,
  })
  async getUserByNickName(
    @Param('userNickName') userNickName: string
  ): Promise<User> {
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
  @ApiParam({
    name: 'user id',
    description: 'user id',
  })
  @ApiBody({
    type: UpdateUserRequestDto,
    description: 'data that user want to update',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success update user',
  })
  async updateUser(
    @Param('userID') userID: string,
    @Body() updateUserDto: UpdateUserRequestDto
  ): Promise<void> {
    await this.userService.updateUser(+userID, updateUserDto)
  }

  /**
   * RESTRICTED: login user
   * @param userId
   * @param role
   */
  @Get(':userID/event')
  @ApiOperation({
    summary: 'get user events',
    description: 'get user register or hosted events.',
  })
  @ApiQuery({
    name: 'role',
    description: 'user role in event. (host || guest)',
  })
  @ApiParam({
    name: 'userID',
    description: 'user id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: EventData,
    description: 'user events',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'bad request query',
  })
  async getUserEvents(
    @Param('userID') userId: string,
    @Query('role') role: string
  ): Promise<EventData> {
    if (role === 'host') {
      return {
        events: await this.userService.findAllUserHostEvent(+userId),
      }
    } else if (role === undefined || role === 'guest') {
      return {
        events: await this.userService.findAllUserGuestEvent(+userId),
      }
    } else {
      throw new BadRequestException('invalid query')
    }
  }

  /**
   * RESTRICTED: login user
   * @param userId
   * @param registerEventDto
   * @param res
   */
  @Post(':userID/event')
  @ApiOperation({
    summary: 'register event',
    description: 'register event',
  })
  @ApiBody({
    type: RegisterEventRequestDto,
    description: 'event id in json',
  })
  @ApiParam({
    name: 'userID',
    description: 'user id',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success register event',
  })
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
    @Body() registerEventDto: RegisterEventRequestDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    await this.userService.registerEvent(+userId, registerEventDto)
    this.setResponseStatus(res, HttpStatus.CREATED)
  }

  /**
   * RESTRICTED: login user
   * @param userId
   * @param unregisterEventDto
   * @param res
   */
  @Delete(':userID/event')
  @ApiOperation({
    summary: 'unregister event',
    description: 'unregister event',
  })
  @ApiBody({
    type: UnregisterEventRequestDto,
    description: 'event id, participation id in json',
  })
  @ApiParam({
    name: 'userID',
    description: 'user id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success unregister event',
  })
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
    @Body() unregisterEventDto: UnregisterEventRequestDto
  ) {
    await this.userService.unregisterEvent(+userId, unregisterEventDto)
  }
}
