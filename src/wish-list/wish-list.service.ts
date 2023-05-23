import { Injectable } from '@nestjs/common';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishListService {
  constructor(private readonly prisma: PrismaService) { }

  // if its alredy liked its dislike it automaticly 

  async LikeProduct(productId: string, _userId: string) {
    try {
      const resp = await this.prisma.wishList.upsert({
        where: {
          userId: _userId
        },
        create: {
          products: {
            connect: {
              id: productId
            },
          },
          user: {
            connect: { id: _userId }
          }
        },
        update: {
          products: {
            connect: { id: productId }
          }
        }
      })

      return resp
    } catch (error) {
      throw error
    }
  }

  async dislikeProduct(productId: string, _userId: string) {
    try {
      const resp = await this.prisma.wishList.update({
        where: {
          userId: _userId
        },
        data: {
          products: { disconnect: { id: productId } }
        }
      })

      return resp
    } catch (error) {
      throw error
    }
  }


  async myWishList(userId: string) {
    try {
      const resp = await this.prisma.wishList.findMany({
        where: { userId },
        include: { products: true }
      })
      return resp
    } catch (error) {
      throw error
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} wishList`;
  // }

  // update(id: number, updateWishListDto: UpdateWishListDto) {
  //   return `This action updates a #${id} wishList`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} wishList`;
  // }
}
