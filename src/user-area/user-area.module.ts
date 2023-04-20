import { Module } from '@nestjs/common';
import { UserAreaService } from './user-area.service';
import { UserAreaController } from './user-area.controller';
import { OrdersService } from '../orders/orders.service';

@Module({
  providers: [UserAreaService,OrdersService],
  controllers: [UserAreaController,]
})
export class UserAreaModule {}
