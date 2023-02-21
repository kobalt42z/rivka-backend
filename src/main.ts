import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, 
    enableDebugMessages:true,
    forbidNonWhitelisted:true, //thorow error when not whitelisted value 
  }));
  await app.listen(3333);
}
bootstrap();
