import { Transform } from "class-transformer";
import {IsEmail, IsString, MinLength} from "class-validator"; //paquete para validar datos de entrada

export class RegisterDto {

    @IsEmail()
    email: string

    @Transform(({value}) => value.trim()) //limpia los espacios en blancos
    @IsString()
    @MinLength(6)
    password: string
}