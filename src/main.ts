import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory,HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist:true, 
  //   enableDebugMessages:true,
  //   forbidNonWhitelisted:true, //thorow error when not whitelisted value 
  
  // })
  // );


  
  const {httpAdapter} = app.get(HttpAdapterHost);
  //* by adding an {} to this constructor it allow us to catch new handlers
  //* example: P2000:HttpStatus.BAD_REQUEST,
  app.useGlobalFilters( new PrismaClientExceptionFilter(httpAdapter,{
    P2023:HttpStatus.BAD_REQUEST
  }))
  app.enableCors({
    origin: "https://rivkanakache.netlify.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    optionsSuccessStatus: 204
  });
  await app.listen(3333);
}
bootstrap();
