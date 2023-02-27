import { IsAlpha, IsAlphanumeric, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Max, MaxLength, MIN, MinLength, } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    name: string
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    brand: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    description: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    ShortDescription: string

    @IsNotEmpty()
    @IsNumber()
    @Max(100000)
    price_ils: number

    @IsNotEmpty()
    @IsNumber()
    @Max(100)
    reduction_p: number

    @IsUrl() // !expermiental
    @IsOptional()
    @MaxLength(200)
    imgUrl?: string
    
    @IsNotEmpty()
    @IsNumber()
    @Max(100000)
    supply: number
}
