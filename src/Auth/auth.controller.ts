import { Controller, Post, Body, UseGuards, UsePipes, ValidationPipe, Get, Req } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { userTokenPayload } from '../interfaces';
import { CreateUserDto } from '../users-managment/dto/create-user.dto';
import { AuthService } from './auth.service';
import { GetPayload } from '../decorators';

import { JwtGuard } from './guards';
import { VALIDATION_CONFIG } from 'src/GlobalConst';
import { FbAuthGuard } from './guards/fb-auth/fb-auth.guard';

@UsePipes(new ValidationPipe(VALIDATION_CONFIG))
@Controller('auth')
export class AuthController {
    constructor(private readonly authservices: AuthService) { }

    
// !not tested yet 
    @UseGuards(FbAuthGuard)
    @Get("testAuth")
    FBValidation(@Req() req:any) {
        return this.authservices.isRegistred(req.user)
    }
}
