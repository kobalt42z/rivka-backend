// custom providers for strategies to import into auth module
// TODO: import strategy from jws and barer extractor 
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

export class JwtStrategieProvider extends PassportStrategy(Strategy) {
    constructor(private authService:AuthService) {
        super();

     }
     validate(token:string):Promise<{Payload:Object}>{


        return ;
     }
}