import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, ValidateNested, validate } from "class-validator";
import { SpecificationsDto } from "src/products/dto/create-product.dto";

export class CreateOrderDto {

    @IsNotEmpty()
    @IsArray()
    @ValidateNested()
    @Type(() => productInCartDto)
    productsInCart: productInCartDto[];


}


export class productInCartDto {


    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(1000)
    count: number

    @IsNotEmpty()
    @IsString()
    specificationId: string
}