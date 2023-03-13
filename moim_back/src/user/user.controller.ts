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
import { DocsCreateUser } from './swagger/DocsCreateUser.docs'
import { DocscheckValidUserNickName } from './swagger/DocsCheckValidUserNickName.docs'
import { DocsGetUserByUserId } from './swagger/DocsGetUserByUserId.docs'
import { DocsGetUsersByPage } from './swagger/DocsGetUsersByPage.docs'
import { DocsGetUserByNickName } from './swagger/DocsGetUserByNickName.docs'
import { DocsUpdateUser } from './swagger/DocsUpdateUser.docs'
import { DocsGetUserEvents } from './swagger/DocsGetUserEvents.docs'
import { DocsRegisterEvent } from './swagger/DocsRegisterEvent.docs'
import { DocsUnregisterEvent } from './swagger/DocsUnregisterEvent.docs'

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
  @DocsCreateUser()
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
  @DocscheckValidUserNickName()
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
  @DocsGetUserByUserId()
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
  @DocsGetUsersByPage()
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
  @DocsGetUserByNickName()
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
  @DocsUpdateUser()
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
  @DocsGetUserEvents()
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
  @DocsRegisterEvent()
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
  @DocsUnregisterEvent()
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
