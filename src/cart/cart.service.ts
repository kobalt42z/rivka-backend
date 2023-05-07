import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

import { userTokenPayload } from 'src/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';

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
            createMany: {
              data: {
                ...itemToAdd.CartProducts
              }
            }
          }
        },
        create: {
          User: {
            connect: { id: user.sub }
          },
          cartProducts: {
            createMany: {
              data: {
                ...itemToAdd.CartProducts
              }
            }
          }

        }

      })
      return cart;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
