
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, ValidateNested } from "class-validator";


export class ProductInCart {
    @IsNotEmpty()
    @IsNumber()
    @Max(500)
    count: number;

    @IsNotEmpty()
    @MaxLength(500)
    @IsString()
    productId: string;
}

export class CreateCartDto {

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => ProductInCart)
    CartProducts: ProductInCart[]
}
