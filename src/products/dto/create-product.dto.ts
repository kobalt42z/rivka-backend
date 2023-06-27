import { Type } from "class-transformer";
import { IsAlpha, IsAlphanumeric, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, max, Max, MaxLength, MIN, MinLength, ValidateNested, } from "class-validator"

export class SpecificationsDto {
    @IsOptional()
    @IsString()
    @MaxLength(10)
    color: string

    @IsOptional()
    @IsString()
    @MaxLength(10)
    size: string

    @IsOptional()
    @IsString()
    @MaxLength(10)
    curve: string

    @IsOptional()
    @IsString()
    @MaxLength(10)
    thickness: string
    
    @IsOptional()
    @IsString()
    @MaxLength(10)
    length: string

    @IsNotEmpty()
    @IsNumber()
    @Max(10000)
    supply: number

}

export class LangueDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(2)
    language: string

    @IsOptional()
    @IsString()
    @MaxLength(30)
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

    @IsOptional()
    @IsNumber()
    @Max(100000)
    supply?: number

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => SpecificationsDto)
    Specifications: SpecificationsDto[]

    @IsNotEmpty()
    @IsArray()
    categoryIds: string[]


    @ValidateNested()
    @IsNotEmpty()
    @IsArray()
    @Type(() => LangueDto)
    translations: LangueDto[]

    @IsNotEmpty()
    active: boolean
}

