import { Module } from '@nestjs/common';
import { UsersModule } from './users-managment/users.module';
import { AuthModule } from './Auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserAreaModule } from './user-area/user-area.module';
import { APP_FILTER } from '@nestjs/core/constants';
import { HttpAdapterHost } from '@nestjs/core/helpers';
import { PrismaClientExceptionFilter } from 'nestjs-prisma/dist/prisma-client-exception.filter';
import { HttpStatus } from '@nestjs/common/enums';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AwsService } from './aws/aws.service';
import { AwsModule } from './aws/aws.module';
import { CartModule } from './cart/cart.module';
import { CommentsModule } from './comments/comments.module';
import { OrdersModule } from './orders/orders.module';
import { WishListModule } from './wish-list/wish-list.module';



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
    CategoriesModule,
    OrdersModule,
    AwsModule,
    ,
    CommentsModule,
    WishListModule,
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
  }, AwsService],
})
export class AppModule {

}
