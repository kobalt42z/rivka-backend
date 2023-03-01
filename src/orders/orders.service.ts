import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { SelfOrderDto } from './dto/selfOrder.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto) {
    try {
      const products = createOrderDto.products.map((id) => ({ id }))
      const order = await this.prisma.order.create({
        data: {
          user: { connect: { id: createOrderDto.user } },
          products: { connect: products }
        }
      });
      return { action_status: "order registred successfully! ", order }
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const orders = await this.prisma.order.findMany({ include: { products: true, user: true } });
      return orders;

    } catch (error) {
      throw error;
    }
  }

  async findOne(_id: string) {
    try {
      const order = await this.prisma.order.findUniqueOrThrow({
        where: { id: _id },
      });
      return order;
    } catch (error) {
      throw error;
    }
  }

  async findeMyOrders(idOfUser: string) {
    try {
      const orders = await this.prisma.order.findMany({
      where: { user:{id:idOfUser}},include:{products:true ,user:{select:{firstName:true,lastName:true,email:true,role:true}}}
      });
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async remove(_id: string) {
    const remouvedOrder = await this.prisma.order.delete({
      where: { id: _id },
    })
    return { action_status: `the #${_id} order was remouved from data base`, remouvedOrder };
  }

  async selfOrder(idOfUser:string,selfOrderDto: SelfOrderDto){
    try {
      const products = selfOrderDto.products.map((id) => ({ id }))
      const order = await this.prisma.order.create({
        data: {
          user: { connect: { id: idOfUser } },
          products: { connect: products }
        }
      });
      return { action_status: "order registred successfully! ", order }
    } catch (error) {
      throw error;
    }
  }
}
