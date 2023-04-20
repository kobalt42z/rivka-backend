import { Injectable } from '@nestjs/common';
import { Roles } from '../interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  creat(createUserDto: CreateUserDto) {
    return { msg: 'This action adds a new user' };
  }

  async findOne(_id: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: _id,
        }
      });
      
      delete user.hash
      return user;
    } catch (error) {
      
      throw error;
    }
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id: _id },
        data: {
          ...updateUserDto
        },
      })
      return { action_status: "uppdtated successfully", user }
    } catch (error) {
      throw error;
    }

  }

  async remove(_id: string) {
    try {
      const user = await this.prisma.user.delete({
        where: { id: _id }
      })
      return { action_status: "deleted successfully", user };
    } catch (error) {
      throw error
    }
  }


  async findAll() {
    try {
      const users = await this.prisma.user.findMany({});
      const withoutPWd = users.map(user => {
        delete user.hash
        return user
      })
      return withoutPWd;
    } catch (error) {
      throw error;
    }
  }

  async changeRole(_id: string, _role: Roles) {
    try {
      const user = await this.prisma.user.update({
        where: { id: _id },
        data: { role: _role }
      })
      return { action_status: `role changed sucessfully to ${user.role}`, user }
    } catch (error) {
      throw error
    }
  }
}
