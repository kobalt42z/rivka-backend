import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

import { UpdateOrderDto } from './dto/update-order.dto';
import { connect } from 'http2';
import { OrderStatus } from 'src/interfaces/Status.interface';

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService) { }

    async createOrder(orderDto: CreateOrderDto) {
        try {

            const order = await this.prisma.order.create({
                data: {
                    user: {
                        connect: {
                            id: orderDto.user
                        },
                    },
                    cartProducts: {
                        createMany: {
                            data: orderDto.productsInCart
                        },
                    },
                    

                }
            })


        } catch (error) {

        }
    }

    async setStatus(orderId: string, status: OrderStatus) {
        try {
            const order = await this.prisma.order.update({
                where: {
                    id: orderId
                },
                data: {
                    status: status,
                    
                },
                
            });
            return order
        } catch (error) {
            throw error
        }
    }

    async findAll() {
        try {
            const orders = await this.prisma.order.findMany({
                include: {
                    cartProducts: { include: { product: true } },
                    user: true,
                }
                
            });
            return orders;
        } catch (error) {
            throw error;
        }
    }



    async findMyOrders(_id: string) {
        try {
            const orders = await this.prisma.order.findMany({
                where: {
                    userId: _id
                },
                include: {
                    cartProducts: { include: { product: true } },
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
