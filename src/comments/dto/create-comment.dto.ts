import { IsAlpha, IsNotEmpty, IsNumber, MaxLength, Min  ,Max, IsAlphanumeric} from "class-validator"

export class CreateCommentDto {

    // @IsNotEmpty()
    // @IsAlpha("he")
    // @MaxLength(30)
    // title: string


    @IsNotEmpty()
    @MaxLength(200)
    body: string


    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number
}
