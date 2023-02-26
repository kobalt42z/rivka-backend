import { Controller, Get, Post, Body, Patch, Param, Delete ,UseGuards, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard, RolesGuard } from 'src/auth/guards';
import { OnlyRole } from 'src/Auth/decorators/OnlyRole.decorator';
import { Roles } from 'src/interfaces';
import { AuthService } from 'src/auth/auth.service';

@UseGuards(JwtGuard,RolesGuard)
@OnlyRole(Roles.ADMIN)
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
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
