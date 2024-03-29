import { Controller, Get, UseGuards, Post, Body, ValidationPipe, Req } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { AuthGuard } from '@nestjs/passport';
import { GetPayload, OnlyRole } from '../decorators';
import { JwtGuard } from '../Auth/guards/jwt.guard';
import { RolesGuard } from '../Auth/guards/role.guard';
import { Roles, userTokenPayload } from '../interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { UserAreaService } from './user-area.service';
// import { OrdersService } from '../orders/orders.service';
import { VALIDATION_CONFIG } from '../GlobalConst';
import { OrdersService } from 'src/orders/orders.service';
import { WishListService } from 'src/wish-list/wish-list.service';
import { CreateUserDto } from 'src/users-managment/dto/create-user.dto';
import {  DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { FbAuthGuard } from 'src/Auth/guards/fb-auth/fb-auth.guard';

@UseGuards(FbAuthGuard)
@Controller('userArea')
export class UserAreaController {
    constructor(
        private readonly userAreaService: UserAreaService,
        private readonly ordersService: OrdersService,
        private readonly wishListService: WishListService
    ) { }

    @Post("registeration")
    registeration(@Body() body: CreateUserDto, @GetPayload() tokenPayload :userTokenPayload) {
        return this.userAreaService.register(body, tokenPayload)
    }
 
    @Get('myInfo')
    getMyInfo(@GetPayload() tokenPayload :userTokenPayload) {
        return this.userAreaService.getMyInfo(tokenPayload);
    }

    @Get('myOrders')
    findeMyOrders(@GetPayload() payload: userTokenPayload) {
        return this.ordersService.findMyOrders(payload)
    }
 
    @Get('myWishList')
    findeMyWishList(@GetPayload() payload: userTokenPayload) {
        return this.wishListService.myWishList(payload)
    }

}
