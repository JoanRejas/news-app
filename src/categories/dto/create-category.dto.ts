import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    name: string;
}