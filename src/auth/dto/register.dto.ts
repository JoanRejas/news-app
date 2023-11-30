import { Transform } from "class-transformer";
import {IsEmail, IsString, MinLength} from "class-validator"; //paquete para validar datos de entrada

export class RegisterDto {

    @IsEmail()
    email: string

    @Transform(({value}) => value.trim()) //valida que el el campo no vaya vacio
    @IsString()
    @MinLength(6)
    password: string
}