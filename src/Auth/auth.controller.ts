import { Controller, Post, Body, UseGuards, UsePipes, ValidationPipe, Get, Req } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { userTokenPayload } from '../interfaces';
import { CreateUserDto } from '../users-managment/dto/create-user.dto';
import { AuthService } from './auth.service';
import { GetPayload } from '../decorators';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guards';
import { VALIDATION_CONFIG } from 'src/GlobalConst';

@UsePipes(new ValidationPipe(VALIDATION_CONFIG))
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
    @Get('validateMe')
    validateMe(@GetPayload() payload: userTokenPayload) {

        return this.authservices.validateMe(payload);

    }

    @Get("testAuth")
    FBValidation(@Req() req) {
        return {msg:'hellow'}
    }
}
