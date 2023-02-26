import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
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
import { UserEventRoleType } from './utils/UserEventRoleType'
import { UserRole } from './utils/UserRole.decorator'

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
   * @param res
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
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'bad parameter',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'there are no matched content',
  })
  async getUserByUserId(
    @Param('userID', ParseIntPipe) userID: number,
    @Res({ passthrough: true }) res: Response
  ): Promise<User> {
    const user = await this.userService.findUserByUserId(+userID)
    if (user === null) {
      this.setResponseStatus(res, HttpStatus.NO_CONTENT)
    }
    return user
  }

  /**
   * RESTRICTED: admin user
   * to show exist user on db. it will send you by 10 users per page
   */
  @Get()
  @UserRole('admin')
  // TODO: auth needed, auth checks user is admin user
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
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'bad query',
  })
  async getUsersByPage(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
  ): Promise<Users> {
    return { Users: await this.userService.findUsersByPage(page) }
  }

  /**
   * RESTRICTED: any user
   * @param userNickName
   * @param res
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
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'there are no user matched',
  })
  async getUserByNickName(
    @Param('userNickName') userNickName: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<User> {
    const user = await this.userService.findUserByNickName(userNickName)
    if (user === null) {
      this.setResponseStatus(res, HttpStatus.NO_CONTENT)
    }
    return user
  }

  /**
   * RESTRICTED: (login user && userid == login user) || (user.role === admin)
   * update user information in db
   * @param userID
   * @param updateUserDto
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
  // TODO: auth needed
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
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid parameter',
  })
  async updateUser(
    @Param('userID', ParseIntPipe) userID: number,
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
  // TODO: auth needed
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
    @Param('userID', ParseIntPipe) userId: number,
    @Query('role') role: UserEventRoleType
  ): Promise<EventData> {
    if (role === UserEventRoleType.HOST) {
      return {
        events: await this.userService.findAllUserHostEvent(+userId),
      }
    } else if (role === undefined || role === UserEventRoleType.GUEST) {
      return {
        events: await this.userService.findAllUserGuestEvent(+userId),
      }
    } else {
      throw new BadRequestException('invalid query')
    }
  }

  /**
   * RESTRICTED: login user || admin user
   * @param userId
   * @param registerEventDto
   */
  @Post(':userID/event')
  // TODO: auth needed
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
    @Param('userID', ParseIntPipe) userId: number,
    @Body() registerEventDto: RegisterEventRequestDto
  ): Promise<void> {
    await this.userService.registerEvent(+userId, registerEventDto)
  }

  /**
   * RESTRICTED: login user || admin user
   * @param userId
   * @param unregisterEventDto
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
    @Param('userID', ParseIntPipe) userId: number,
    @Body() unregisterEventDto: UnregisterEventRequestDto
  ) {
    await this.userService.unregisterEvent(+userId, unregisterEventDto)
  }
}
