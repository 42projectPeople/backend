import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { globalExceptionFilter } from './exception/globalExceptionFilter'
import { IUser } from './auth/interface/IUser'

//User 인터페이스
declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.useGlobalFilters(new globalExceptionFilter())
  const config = new DocumentBuilder()
    .setTitle('Moim Api')
    .setDescription('Moim API description')
    .setVersion('1.0')
    .addTag('moim')
    .addBearerAuth()
    .addSecurity('accessToken', {
      description: 'access Token',
      name: 'accessToken',
      scheme: 'bearer',
      type: 'http',
      bearerFormat: 'JWT',
    })
    .build()
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders:
      'Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
  })
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)
  await app.listen(3000)
}
bootstrap()
