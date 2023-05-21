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
              id: userId
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

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
