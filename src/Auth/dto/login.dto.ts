
import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";


//  allow me to creat a dto from another by herrit certain properties 
export class LoginDto extends PickType(CreateUserDto,['email','password'] as const ) {} 