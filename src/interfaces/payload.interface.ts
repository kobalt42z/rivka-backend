import { PrismaClient } from "@prisma/client"
export interface userTokenPayload {
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
