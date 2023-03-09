import { IsArray, IsNotEmpty, MaxLength } from "class-validator";

export class CreateOrderDto {
    
    @IsNotEmpty()
    @MaxLength(50)
    user: string;

    @IsNotEmpty()
    @IsArray()  
    products: string[];
}
