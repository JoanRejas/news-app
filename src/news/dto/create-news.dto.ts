import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNewsDto {

    @IsString()
    @IsNotEmpty() //Para asegurar que el campo NO ESTE VACIO
    title: string;

    @IsString()
    @IsNotEmpty()
    subtitle: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    category?: string;
}
