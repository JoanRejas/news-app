import { IsEmail, IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    age?: number; //Dejamos como OPCIONAL

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @IsOptional()
    rol?: string;
}