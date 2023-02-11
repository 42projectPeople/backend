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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
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
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'create user operation is failed',
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
    @Body() updateUserDto: UpdateUserRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.userService.updateUser(+userID, updateUserDto)
    this.setResponseStatus(res, HttpStatus.ACCEPTED)
  }

  /**
   * RESTRICTED: login user
   * @param userId
   * @param role
   */
  @Get(':userID/event')
  async getUserEvents(
    @Param('userID') userId: string,
    @Query('role') role: string
  ) {
    console.log(role)
    if (role === 'host') {
      return await this.userService.findAllUserHostEvent(+userId)
    } else if (role === undefined || role === 'guest') {
      return await this.userService.findAllUserGuestEvent(+userId)
    } else {
      throw new BadRequestException('invalid query')
    }
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
    @Body() registerEventDto: RegisterEventRequestDto
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
    @Body() unregisterEventDto: UnregisterEventRequestDto
  ) {
    await this.userService.unregisterEvent(+userId, unregisterEventDto)
  }
}
