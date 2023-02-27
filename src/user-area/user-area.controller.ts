import { Controller, Get ,UseGuards} from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { AuthGuard } from '@nestjs/passport';
import { GetPayload ,OnlyRole} from '../decorators';
import { JwtGuard } from 'src/Auth/guards/jwt.guard';
import { RolesGuard } from 'src/Auth/guards/role.guard';
import {  Roles, userTokenPayload } from 'src/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserAreaService } from './user-area.service';

@Controller('user-area')
export class UserAreaController {
    constructor(private readonly userAreaService:UserAreaService) { }
    @UseGuards(JwtGuard,RolesGuard)
    @OnlyRole(Roles.ADMIN)
    @Get('myInfo')
    getMyInfo(@GetPayload() payload:userTokenPayload ){
        return this.userAreaService.getMyInfo(payload.sub) ;
    }
}
