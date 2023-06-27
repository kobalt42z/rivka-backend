import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin'
import { project_id, client_email, private_key } from './cred.json'; //! adding resolveJsonModule to tsconf
import { MakeFirstAdmin } from './Func/makeAdmin';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ? FB initialization:
  const fb =  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: client_email,
      privateKey: private_key,
      projectId: project_id
    }),
  })

  // MakeFirstAdmin("wkKXuQsJrBWnWvikSzUorAaYFza2") //? activate me for binde first admin
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, 
    enableDebugMessages:true,
    forbidNonWhitelisted:true, //thorow error when not whitelisted value 
    transform:true,
    validateCustomDecorators:false, //

  })
  );




  const { httpAdapter } = app.get(HttpAdapterHost);
  //* by adding an {} to this constructor it allow us to catch new handlers
  //* example: P2000:HttpStatus.BAD_REQUEST,
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter, {
    P2023: HttpStatus.BAD_REQUEST
  }))
  
  app.enableCors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  });
  await app.listen(3333);
}
bootstrap();
