import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { Role } from "@prisma/client";
import { userTokenPayload } from "src/interfaces";

/*
* this guard hook the route metadata 'role' and check :
  * case role metadata is empty passs
  * case role metadata contain role (Role-enum)  : 
  *    if user payload contain this role pass 
  *       else block
  * 
  * must be called after jwtguard in useGard(...guards)
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }


  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<string>('role',
      [context.getHandler(), context.getClass()]);
    if (!requiredRole) return true;
    const request = context.switchToHttp().getRequest();
    const userPayload: userTokenPayload = request.user;



    if (userPayload.role == requiredRole) return true;
    else return false;

  }
}