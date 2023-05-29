import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from 'src/interfaces/Status.interface';
import { userTokenPayload } from 'src/interfaces';

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService) { }

    async createOrder(orderDto: CreateOrderDto, decodedToken: userTokenPayload) {
        try {

            const order = await this.prisma.order.create({
                data: {
                    user: {
                        connect: {
                            id: decodedToken.sub
                        },
                    },
                    cartProducts: {
                        createMany: {
                            data: orderDto.productsInCart
                        },
                    },
                }
            })
            return order

        } catch (error) {
            throw error
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



    async findMyOrders(decodedToken:userTokenPayload) {
        try {
            const orders = await this.prisma.order.findMany({
                where: {
                    userId: decodedToken.sub
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

    async remove(orderId: string) {
        const remouvedOrder = await this.prisma.order.delete({
            where: { id: orderId },
        })
        return { action_status: `the #${orderId} order was remouved from data base`, remouvedOrder };
    }


}
