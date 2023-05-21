import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

import { userTokenPayload } from 'src/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductInCart } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) { }
  async addToCart(itemToAdd: CreateCartDto, user: userTokenPayload) {
    try {


      const cart = this.prisma.cart.upsert({
        where: {
          userId: user.sub
        }, update: {
          cartProducts: {
            deleteMany: {}
            ,
            createMany: {
              data: itemToAdd.CartProducts

            }
          }
        },
        create: {

          User: {
            connect: { id: user.sub }
          },
          cartProducts: {
            createMany: {
              data: itemToAdd.CartProducts
            }
          }

        }

      })
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async myCart(_id: string) {
    try {
      const cart = await this.prisma.cart.findMany({
        where: { userId: _id },
        include: {
          cartProducts: true
        }
      })
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async checkOut(_id: string) {
    try {
      const cart = await this.prisma.cart.findUniqueOrThrow({
        where: { userId: _id }
        , include: {
          cartProducts: {
            include: { product: true }
          }
        }
      })
      const TotalCart = () => {
        let count = 0;
        const finalPrice = cart.cartProducts.map(cartProduct => {
          count += cartProduct.count
          return cartProduct.product.base_price * cartProduct.count
        })
        
        return { totalPrices: finalPrice.reduce((accumulator, currentValue) => accumulator + currentValue,
          0), totalProducts: count }
      }
      const total = TotalCart();
      const Order = await this.prisma.order.create({
        data: {
          user: { connect: { id: _id } },
          cart: { connect: { id: cart.id } },
          totalItems: total.totalProducts,
          totalPrice: total.totalPrices,


        }
      })

      return Order;
    } catch (error) {
      throw error;
    }
  }
  // findOne(id: number) {
  //   return `This action returns a #${id} cart`;
  // }

  // update(id: number, updateCartDto: UpdateCartDto) {
  //   return `This action updates a #${id} cart`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} cart`;
  // }
}
