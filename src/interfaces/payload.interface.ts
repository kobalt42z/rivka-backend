import { PrismaClient } from "@prisma/client"
export interface userTokenPayload {
  firstName:string;
  lastName:string;
  sub: string,
  role: Roles,
  iat: number,
  exp: number
}
export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  EMPLOYEE='EMPLOYEE',
}
