import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe,  } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtGuard, RolesGuard } from '../Auth/guards';
import { GetPayload, OnlyRole } from '../decorators';
import { Roles, userTokenPayload } from '../interfaces';
import { VALIDATION_CONFIG } from '../GlobalConst';
import { setStatusDto } from './dto/set-status.dto';
import { FbAuthGuard } from 'src/Auth/guards/fb-auth/fb-auth.guard';

@UseGuards(FbAuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @GetPayload() payload:userTokenPayload) {
    return this.ordersService.createOrder(createOrderDto,payload);
  }


  @OnlyRole(Roles.ADMIN)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }


  @OnlyRole(Roles.ADMIN)
  @Post("setStatus/:id")
  setStatus(@Param("id") orderId: string, @Body() Body: setStatusDto) {
    return this.ordersService.setStatus(orderId, Body.status);
  }



  @OnlyRole(Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
