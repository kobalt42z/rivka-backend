import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { SelfOrderDto } from './dto/selfOrder.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService) { }



    async findAll() {
        try {
            const orders = await this.prisma.order.findMany({
                include: {
                    cart: { include: { cartProducts: { include: { product: true } } } },
                    user: true,
                }
            });
            return orders;
        } catch (error) {
            throw error;
        }
    }

    async findByDate(_id: string) {
        try {
            const order = await this.prisma.order.findUniqueOrThrow({
                where: { id: _id },
            });
            return order;
        } catch (error) {
            throw error;
        }
    }

    async findMyOrders(_id: string) {
        try {
            const orders = await this.prisma.order.findMany({
                where:{
                    userId:_id
                },
                include: {
                    cart: { include: { cartProducts: { include: { product: true } } } },
                    user: true,
                }
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

  
}
