import { IsRole } from "src/auth/decorators";
import { Roles } from "src/interfaces";

export class ChangeRoleDto{
    @IsRole({message:"role must be  valid and of type role "})
    role:Roles;
}