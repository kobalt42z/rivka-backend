import { Injectable } from '@nestjs/common';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { userTokenPayload } from 'src/interfaces';

@Injectable()
export class WishListService {
  constructor(private readonly prisma: PrismaService) { }

  // if its alredy liked its dislike it automaticly 

  async LikeProduct(productId: string, decodedToken: userTokenPayload) {
    try {
      const resp = await this.prisma.wishList.upsert({
        where: {
          userId: decodedToken.sub
        },
        create: {
          products: {
            connect: {
              id: productId
            },
          },
          user: {
            connect: { id: decodedToken.sub }
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

  async dislikeProduct(productId: string, { sub }: userTokenPayload) {
    try {
      const resp = await this.prisma.wishList.update({
        where: {
          userId: sub
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


  async myWishList({ sub }: userTokenPayload) {
    try {
      const resp = await this.prisma.wishList.findMany({
        where: { userId: sub },
        include: { products: true }
      })
      return resp
    } catch (error) {
      throw error
    }
  }


}
