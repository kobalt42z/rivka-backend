import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
// export interface userTokenPayload {
//   firstName:string;
//   lastName:string;
//   sub: string,
//   role: Roles,
//   iat: number,
//   exp: number
// }


export interface userTokenPayload extends DecodedIdToken {}
export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  EMPLOYEE='EMPLOYEE',
}
