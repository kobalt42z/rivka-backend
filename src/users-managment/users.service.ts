import { Injectable } from '@nestjs/common';
import { Roles, userTokenPayload } from '../interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as FBAdmin from 'firebase-admin'
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  creat(createUserDto: CreateUserDto) {
    return { msg: 'This action adds a new user' };
  }

  async findOne(uid: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          uid
        }
      });

      const FBUser = await FBAdmin.auth().getUser(uid);
      return { user, claims:FBUser.customClaims};
    } catch (error) {

      throw error;
    }
  }


  async findAll() {
    try {
      const users = await this.prisma.user.findMany({});
      return users;
    } catch (error) {
      throw error;
    }
  }


  async update(uid: string, data: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { uid: uid },
        data: {
          ...data,
          address: {
            update: {
              ...data.address
            }
          }
        },
      })
      return { action_status: "uppdtated successfully", user }
    } catch (error) {
      throw error;
    }

  }

  async remove(uid: string) {
    try {
      const user = await this.prisma.user.delete({
        where: { uid }
      })
      return { action_status: "deleted successfully", user };
    } catch (error) {
      throw error
    }
  }


  // pass null to remove the claim 
  async changeRole(uid: string, role: Roles | null) {
    try {
      await FBAdmin.auth().setCustomUserClaims(uid, { role });
      const user = await FBAdmin.auth().getUser(uid);
      return { action_status: `role changed sucessfully to ${user.customClaims}`, user }
    } catch (error) {
      throw error
    }
  }
}
