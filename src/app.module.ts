import { Module } from '@nestjs/common';
import { UsersModule } from './users-managment/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserAreaModule } from './user-area/user-area.module';
import { APP_FILTER } from '@nestjs/core/constants';
import { HttpAdapterHost } from '@nestjs/core/helpers';
import { PrismaClientExceptionFilter } from 'nestjs-prisma/dist/prisma-client-exception.filter';
import { HttpStatus } from '@nestjs/common/enums';
import { ProductsModule } from './products/products.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    PrismaModule,
    UserAreaModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useFactory: ({ httpAdapter }: HttpAdapterHost) => {
      return new PrismaClientExceptionFilter(httpAdapter,{
        P2023:HttpStatus.BAD_REQUEST
      });
    },
    inject: [HttpAdapterHost],
  }],
})
export class AppModule {

}
