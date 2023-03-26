import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtGuard, RolesGuard } from 'src/auth/guards';
import { GetPayload, OnlyRole } from '../decorators';
import { Roles, userTokenPayload } from 'src/interfaces';

@UseGuards(JwtGuard, RolesGuard)
@OnlyRole(Roles.ADMIN)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }


  @Get()
  findAll() {
    return this.ordersService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }




  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}