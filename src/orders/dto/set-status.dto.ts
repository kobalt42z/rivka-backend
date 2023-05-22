import { Type } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { OrderStatus } from "src/interfaces/Status.interface";
import { MinLength } from "class-validator";

export class setStatusDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @MinLength(4)
    status: OrderStatus
} 