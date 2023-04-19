import { Controller, Get ,UseGuards,Post,Body, ValidationPipe, UsePipes} from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { AuthGuard } from '@nestjs/passport';
import { GetPayload ,OnlyRole} from '../decorators';
import { JwtGuard } from 'src/Auth/guards/jwt.guard';
import { RolesGuard } from 'src/Auth/guards/role.guard';
import {  Roles, userTokenPayload } from 'src/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserAreaService } from './user-area.service';
import { OrdersService } from 'src/orders/orders.service';
import { SelfOrderDto } from 'src/orders/dto/selfOrder.dto';
import { VALIDATION_CONFIG } from 'src/GlobalConst';

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
