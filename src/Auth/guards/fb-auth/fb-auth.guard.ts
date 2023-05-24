import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { auth } from 'firebase-admin'
import { Request } from 'express'

@Injectable()
export class FbAuthGuard implements CanActivate {
  // ? extract the req from the EXPRESS requset using context and send return it 
  //? format Autorization Bearer <token>

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req)
    if (!token) return false
    try {
      const decodedToken = await auth().verifyIdToken(token);
      req['user'] = decodedToken
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
