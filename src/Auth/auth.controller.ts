import { Controller, Post ,Body} from '@nestjs/common';
import { CreateUserDto } from 'src/users-managment/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservices : AuthService){}

    @Post('register')
    register(@Body() RegisterDto : CreateUserDto){
        return this.authservices.register(RegisterDto);
    }


    @Post('login')
    login(@Body() loginDto:LoginDto ){
        return this.authservices.login(loginDto);
    }
}
