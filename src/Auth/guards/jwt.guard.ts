import { Injectable } from "@nestjs/common/decorators";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
// ! the 'jwt' is from jwt strategy name 
// we do it here for more readable 
export class JwtGuard extends AuthGuard('jwt'){
    constructor(){
        super();
    }
}