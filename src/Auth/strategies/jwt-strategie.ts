// custom providers for strategies to import into auth module
// TODO: import strategy from jws and barer extractor 
import { ForbiddenException } from "@nestjs/common/exceptions";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import {Injectable} from '@nestjs/common'
import { AuthService } from "../auth.service";
import { userTokenPayload } from "src/interfaces";


/* 
*creat a strategy that take the barer token from header verify it and if its valid add the decoded payload to the request as req.user

? the 2end argument passet to passportStrategy() is the name of the strategy to reuse in guards
? the name is used for injecting it later so cerfule with that string ! 

! cerfule ! : the names of the arguments in super() must be exactly the same as described in their documentation : 
!in our project its :
   * jwtFromRequest : to choose the extractor 
   * secretOrKey : to provide the key or the secret from config
   * and the method validate : to validate logic and pass the payload to req.user 
   
!if you change one of them you will get an error save yourtime 


*/
@Injectable()
export class JwtStrategieProvider extends PassportStrategy(Strategy, 'jwt',) {
   constructor(config: ConfigService, private prisma: PrismaService ) {
      super({
         jwtFromRequest:
         ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: config.get('JWT_SECRET')
      });

   }

   /* 
   * this method is required by passportStrategy we cann add custom logic here like:
   * retrive user data from db and add it to request 
   * for now its just getting the payload from decodedtoken and return it 
   */
   validate(payload:userTokenPayload) { 
      return payload
   }

}