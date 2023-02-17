import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { globalExceptionFilter } from './exception/globalExceptionFilter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new globalExceptionFilter())
  const config = new DocumentBuilder()
    .setTitle('Moim Api')
    .setDescription('Moim API description')
    .setVersion('1.0')
    .addTag('moim')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(3000)
}
bootstrap()
