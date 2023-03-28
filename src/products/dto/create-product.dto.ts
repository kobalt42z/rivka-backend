import { Type } from "class-transformer";
import { IsAlpha, IsAlphanumeric, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, max, Max, MaxLength, MIN, MinLength, ValidateNested, } from "class-validator"


export class LangueDto {

    @IsOptional()
    @IsString()
    @MaxLength(2)
    language: string

    @IsOptional()
    @IsString()
    @MaxLength(100)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    description: string;
}
export class TranslationDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => LangueDto)
    fr: LangueDto

    @IsOptional()
    @ValidateNested()
    @Type(() => LangueDto)
    en: LangueDto
}
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
    @IsNumber()
    @Max(100000)
    base_price: number

    @IsNotEmpty()
    @IsNumber()
    @Max(100000)
    selling_price: number

    @IsNotEmpty()
    @IsNumber()
    @Max(100)
    reduction_p: number

    @IsNotEmpty()
    @IsNumber()
    @Max(100000)
    supply: number

    @IsUrl() // !expermiental
    @IsOptional()
    @MaxLength(200)
    imgUrl?: string


    @IsArray()
    categoryIds: string[]

    @IsOptional()
    @IsArray()
    colors: string[]

    @IsOptional()
    @IsArray()
    sizes: string[]

    @IsOptional()
    @IsArray()
    curves: string[]

    @IsOptional()
    @IsArray()
    thickness: string[]

    @ValidateNested()
    @IsOptional()
    @Type(() => TranslationDto)
    translations: TranslationDto

    @IsNotEmpty()
    active: boolean
}

