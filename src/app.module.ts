import { Module } from '@nestjs/common';
import { UsersModule } from './users-managment/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserAreaModule } from './user-area/user-area.module';
import {APP_GUARD} from '@nestjs/core'
import { RolesGuard } from './Auth/guards/role.guard';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
    }),
  UsersModule,
  AuthModule,
  PrismaModule,
  UserAreaModule,
  ],
  controllers: [],
  providers: [  ],
})
export class AppModule {

}
