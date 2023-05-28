import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDateString, isNotEmpty, IsNumber, isNumber, IsOptional, Max, ValidateNested } from "class-validator";
import { IsAlpha, IsAlphanumeric, isAlphanumeric, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, isString, IsStrongPassword, maxLength, MaxLength, MinLength } from "class-validator";



export class AddressDto {

    @IsNotEmpty()
    @MaxLength(200)
    @IsString()
    street: string

    @IsNumber()
    @Max(1000)
    stNum: number;


    @IsOptional()
    @MaxLength(2)
    @IsString()
    entrance?: string; // optional

    @IsNotEmpty()
    @Max(1000)
    @IsNumber()
    apartment: number;

    @IsNotEmpty()
    @MaxLength(200)
    @IsString()
    city: string;

    @IsNotEmpty()
    @MaxLength(15)
    @IsString()
    postalCode: string;
}

//the dto allow us to pass data and filter them using pipe  and validator class .
export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    fullName: string;


    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber() // ! must start with +00 region code 
    @MaxLength(20)
    phone: string;

    @IsOptional()
    @IsDateString() //ISO 8601 format
    dateOfBirth: Date;

    @IsOptional()
    @IsBoolean()
    acceptEmail: boolean;

    @IsOptional()
    @MaxLength(2)
    @IsString()
    selectedLanguage: string;

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => AddressDto)
    address: AddressDto;
}

