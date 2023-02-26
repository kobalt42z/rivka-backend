import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { userTokenPayload } from 'src/interfaces';
import { CreateUserDto } from 'src/users-managment/dto/create-user.dto';
import { AuthService } from './auth.service';
import { GetPayload } from './decorators';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guards';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservices: AuthService) { }

    @Post('register')
    register(@Body() RegisterDto: CreateUserDto) {
        return this.authservices.register(RegisterDto);
    }


    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authservices.login(loginDto);
    }

    @UseGuards(JwtGuard)
    @Post('validateMe')
    validateMe(@GetPayload() payload: userTokenPayload) {
        
            return this.authservices.validateMe(payload);
        
    }
}
