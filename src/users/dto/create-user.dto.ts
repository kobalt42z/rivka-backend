import { isNotEmpty } from "class-validator";
import { IsAlpha, IsAlphanumeric, isAlphanumeric, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, isString, IsStrongPassword, maxLength, MaxLength, MinLength } from "class-validator";

//the dto allow us to pass data and filter them using pipe  and validator class .
export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    @MaxLength(10)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    @MaxLength(10)
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber() // ! must start with +00 region code 
    @MaxLength(20)
    phone: string;
}
