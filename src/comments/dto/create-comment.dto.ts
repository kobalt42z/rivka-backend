import { IsAlpha, IsNotEmpty, IsNumber, MaxLength, Min  ,Max} from "class-validator"

export class CreateCommentDto {

    @IsNotEmpty()
    @IsAlpha("he")
    @MaxLength(30)
    title: string


    @IsNotEmpty()
    @IsAlpha("he")
    @MaxLength(200)
    body: string


    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number
}
