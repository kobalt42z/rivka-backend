import { Controller, Post ,Body} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservices : AuthService){}

    @Post('login')
    register(@Body() RegisterDto : CreateUserDto){
        return this.authservices.register(RegisterDto);
    }


    @Post()
    login(@Body() loginDto:LoginDto ){

    }
}
