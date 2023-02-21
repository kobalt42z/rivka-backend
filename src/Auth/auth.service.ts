import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as argon from "argon2"

@Injectable()
export class AuthService {
    async register(dto: CreateUserDto) {
        const hash = await argon.hash(dto.password);
        const user = {
            fullname: {
                firstName: dto.firstName,
                lastName: dto.lastName,
            },
            email: dto.email,
            hash: hash,
            phone: dto.phone
        }
        return {user}
    }
}
