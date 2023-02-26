import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserAreaService {
    constructor(private prisma : PrismaService){}

    async getMyInfo(sub: string) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: sub
                }
            });
            delete user.hash;
            return user
        } catch (error) {
            if (error.code === 'p2025') throw new ForbiddenException("token invalid ")
            throw error;
        }
    }
  
}
