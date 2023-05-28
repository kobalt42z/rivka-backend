import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { Roles, userTokenPayload } from "src/interfaces";


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }


  canActivate(context: ExecutionContext): boolean {
    // this is retrive the metadata role atached to the particular route
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!requiredRoles) return true;


    // get the role from the httpRequset interceped by the previous guard in token payload
    const req = context.switchToHttp().getRequest();
    if (!req.user) return false;
    const decodedToken:userTokenPayload = req.user;
    if (requiredRoles.includes(decodedToken.role)) return true;
    else return false;
    
  }
}