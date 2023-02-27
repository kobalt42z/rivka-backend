import { IsAlphanumeric, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    description: string;
    
    @IsUrl()
    @MaxLength(300)
    @IsOptional()
    imgUrl:string;
    

}
