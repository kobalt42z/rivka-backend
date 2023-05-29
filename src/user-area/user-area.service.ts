import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from 'src/users-managment/dto/create-user.dto';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { Roles, userTokenPayload } from 'src/interfaces';
import { UpdateUserDto } from 'src/users-managment/dto/update-user.dto';
import * as FBadmin from 'firebase-admin'
@Injectable()
export class UserAreaService {
    constructor(private prisma: PrismaService) { }

    async getMyInfo(decodedToken: userTokenPayload) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    uid: decodedToken.sub
                }
            });
           
            return user
        } catch (error) {
            throw error;
        }
    }


    async register(data: CreateUserDto, decodedToken: userTokenPayload) {
        try {
            const resp = await this.prisma.user.create({
                data: {
                    ...data,
                    uid: decodedToken.sub,
                    authProviderName: decodedToken.firebase.sign_in_provider,
                    address: {
                        create: { ...data.address }
                    }
                }
            });
            console.log('ime here');
            
            await FBadmin.auth().setCustomUserClaims(resp.uid, { role: Roles.USER })
            return resp;
        } catch (error) {
            throw error;
        }
    }

    // !custom update avoid changing uid or role only autorized 
    // async updateMyProfile(data: UpdateUserDto, decodedToken: userTokenPayload) {
    //     try {
    //         const resp = await this.prisma.user.update({
    //             where: { uid: decodedToken.sub },
    //             data:{...data,}
    //         })
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}
