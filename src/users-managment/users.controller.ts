import { Controller, Get, Post, Body, Patch, Param, Delete ,UseGuards, Query, ValidationPipe, UsePipes} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard, RolesGuard } from '../Auth/guards';
import { OnlyRole } from '../decorators';
import { Roles } from '../interfaces';
import { AuthService } from '../Auth/auth.service';
import { ChangeRoleDto } from './dto/change-role.dto';
import { VALIDATION_CONFIG } from '../GlobalConst';

@UseGuards(JwtGuard,RolesGuard)
@OnlyRole(Roles.ADMIN)
@UsePipes(new ValidationPipe(VALIDATION_CONFIG))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService , private readonly authServices:AuthService) {}

  
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authServices.register(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string ) {
    return this.usersService.remove(id);
  }

  @Patch('role/:id')
  changeRole(@Param('id')id:string , @Body() changeRoleDto:ChangeRoleDto){
    return this.usersService.changeRole(id,changeRoleDto.role)
  }
}
