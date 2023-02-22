import { Module } from '@nestjs/common';
import { UsersModule } from './users-managment/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
    }),
  UsersModule,
  AuthModule,
  PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
