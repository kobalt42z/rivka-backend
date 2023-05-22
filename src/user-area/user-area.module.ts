import { Module } from '@nestjs/common';
import { UserAreaService } from './user-area.service';
import { UserAreaController } from './user-area.controller';
import { OrdersService } from 'src/orders/orders.service';
import { WishListService } from 'src/wish-list/wish-list.service';
// import { OrdersService } from '../orders/orders.service';

@Module({
  providers: [UserAreaService,OrdersService,WishListService],
  controllers: [UserAreaController,]
})
export class UserAreaModule {}
