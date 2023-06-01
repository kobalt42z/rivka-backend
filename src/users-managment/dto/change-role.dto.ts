import { IsRole } from "../../decorators";
import { Roles } from "src/interfaces";

export class ChangeRoleDto{
    @IsRole({message:"invalid role name"})
    role:Roles;
}