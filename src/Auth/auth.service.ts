import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users-managment/dto/create-user.dto';
import * as argon from "argon2"
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Payload, PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { throwError } from 'rxjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { userTokenPayload } from 'src/interfaces';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
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
                    dateOfBirth: dto.dateOfBirth,
                    email: dto.email,
                    hash: hash,
                    phone: dto.phone,
                    acceptEmail:dto.acceptEmail?true:false,
                    selectedLanguage:dto.selectedLanguage
                }
            })
            return { msg: "created successfully!", user }
        } catch (err) {
            throw err
        }

    }

    async login(dto: LoginDto) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    email: dto.email
                }
            });
            const pwdMatch = await argon.verify(user.hash, dto.password)
            if (!pwdMatch) throw new ForbiddenException("incorret credentials")

            //  const subsetUser = (({ email, firstName, lastName, id, role }) => (({ email, firstName, lastName, id, role })))(user);


            delete user.hash
            const token = await this.signToken(user.id, user.role,[user.firstName, user.lastName]);
            return { token: token, user  }


        } catch (error) {
            if (error.code === "P2025") throw new ForbiddenException("incorrect credentials .")
            throw error;
        }

    }

    //  * function that sign token 
    async signToken(id: string, role: string ,fullName:string[]): Promise<string> {
        const payload = { sub: id, role ,firstName:fullName[0], lastName:fullName[1]}
        const secret = this.config.get('JWT_SECRET')


        return await this.jwt.signAsync(payload, { secret: secret, expiresIn: '60m' })
    }
    async validateToken(token: string): Promise<userTokenPayload> {
        const decodeToken = await this.jwt.verifyAsync(token, { secret: this.config.get('JWT_TOKEN') })
        return decodeToken
    };
    async validateMe(payload: userTokenPayload) {
        return { valid: true, payload: payload }
    }
}


