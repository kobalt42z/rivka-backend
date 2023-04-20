import { Controller, Get ,UseGuards,Post,Body, ValidationPipe, UsePipes} from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { AuthGuard } from '@nestjs/passport';
import { GetPayload ,OnlyRole} from '../decorators';
import { JwtGuard } from '../Auth/guards/jwt.guard';
import { RolesGuard } from '../Auth/guards/role.guard';
import {  Roles, userTokenPayload } from '../interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { UserAreaService } from './user-area.service';
import { OrdersService } from '../orders/orders.service';
import { SelfOrderDto } from '../orders/dto/selfOrder.dto';
import { VALIDATION_CONFIG } from '../GlobalConst';

@UseGuards(JwtGuard, RolesGuard)
@OnlyRole(Roles.USER)
@UsePipes(new ValidationPipe(VALIDATION_CONFIG))
@Controller('userArea')
export class UserAreaController {
    constructor(private readonly userAreaService:UserAreaService, private readonly ordersService:OrdersService) { }

   
    @Get('myInfo')
    getMyInfo(@GetPayload() payload:userTokenPayload ){
        return this.userAreaService.getMyInfo(payload.sub) ;
    }

    @Get('myOrders')
    findeMyOrders(@GetPayload() payload: userTokenPayload) {
        console.log(payload.sub);
        
      return this.ordersService.findeMyOrders(payload.sub)
    }
    @Post('selfOrder')
    selfOrder(@GetPayload() payload : userTokenPayload ,@Body() selfOrderDto:SelfOrderDto ){
        return this.ordersService.selfOrder(payload.sub,selfOrderDto)
    }
}
