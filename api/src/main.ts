import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filters';
import { MongoExceptionFilter } from './filters/mongo-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MongoExceptionFilter(), new HttpExceptionFilter());
  app.enableCors();
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
