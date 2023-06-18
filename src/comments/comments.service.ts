import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService
  ) { }

  async create(createCommentDto: CreateCommentDto, userId: string, productId: string) {
    try {
      const comment = await this.prisma.comment.create({
        data: {
          ...createCommentDto,
          user: {
            connect: {
              uid: userId
            }
          },
          product: {
            connect: {
              id: productId
            }
          }
        }
      }
      );
      return comment;
    } catch (error) {
      throw error
    }
  }



  async remove(_id: string) {
    try {
      const res = await this.prisma.comment.delete({ where: { id: _id } })
      return res
    } catch (error) {
      throw error
    }
  }
}
