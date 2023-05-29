import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users-managment/dto/create-user.dto';
import * as argon from "argon2"
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Payload, PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { throwError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AwsService } from '../aws/aws.service';
import { AssumeRoleCommandOutput } from '@aws-sdk/client-sts';
import {  DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService,
        private config: ConfigService,
        private Aws: AwsService
    ) { }


    // check if uid exist in db and validate the token 
    async isRegistred(decodedToken :DecodedIdToken) {
        try {
            console.log(decodedToken);
            
            const resp = await this.prisma.user.findUniqueOrThrow({ where: { uid: decodedToken.sub } })
            return resp
        } catch (error) {
            throw error
        }
    }


}


