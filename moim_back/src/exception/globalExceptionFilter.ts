/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class globalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const req = ctx.getRequest<Request>()
    const message = (exception as any).message

    Logger.error(message, (exception as any).stack, `${req.method} ${req.url}`)

    const name = exception?.constructor?.name || 'HttpException'
    let status = HttpStatus.INTERNAL_SERVER_ERROR

    switch (name) {
      case 'HttpException':
        status = (exception as HttpException).getStatus()
        break
      case 'UnauthorizedException':
        status = HttpStatus.UNAUTHORIZED
        break
      case 'ForbiddenException':
        status = HttpStatus.FORBIDDEN
        break
      case 'ConflictException':
        status = HttpStatus.CONFLICT
        break
      case 'EntityNotFoundError' || 'NotFoundException':
        status = HttpStatus.NOT_FOUND
        break
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR
    }
    res.status(status).json({
      statusCode: status,
      error: name,
      message,
      method: req.method,
      path: req.url,
      timestamp: new Date().toISOString(),
    })
  }
}
