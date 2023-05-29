import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, ValidateNested, validate } from "class-validator";

export class CreateOrderDto {

    @IsNotEmpty()
    @IsArray()
    @ValidateNested()
    @Type(() => productInCartDto)
    productsInCart: productInCartDto[];

    
}

export class productInCartDto {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(1000)
    count: number

    @IsOptional()
    @IsString()
    @MaxLength(10)
    color?: string

    @IsOptional()
    @IsString()
    @MaxLength(5)
    sizes?: string

    @IsOptional()
    @IsString()
    @MaxLength(5)
    curves?: string

    @IsOptional()
    @IsString()
    @MaxLength(5)
    thickness?: string
}