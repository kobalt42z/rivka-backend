import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as argon from "argon2"
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private config: ConfigService
    ) { }

    async register(dto: CreateUserDto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    email: dto.email,
                    hash: hash,
                    phone: dto.phone
                }
            })
            return { msg: "created successfully!", user }
        }
        catch (error) {

            if (error.code === 'P2002') {
                throw new ForbiddenException(
                    "unique restriction violation"
                )
            }
            throw error.code



        }
    }
}
