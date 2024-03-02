import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'; //importamos la encriptacion para acceder a todos sus metodos
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService, //lamamos a los metodos del userService para register y buscar un usuario
        private readonly jwtService: JwtService
    ) {}
    
    async register({email, password}: RegisterDto) { //recivimos los datos del controlador

        const user = await this.usersService.findOneByEmail(email); //VERIFICAMOS si existe el email en la DB

        if(user) { // SI YA EXISTE EL USUARIO EN LA DB
            throw new BadRequestException('User already exists');
        }
        // SI NO GUARDAMOS
        return await this.usersService.create({
            email, 
            password: await bcrypt.hash(password, 10) //ENCRIPTAMOS la contraseña con hash(password, saltos aleatorio al momento de encriptar)
        }); //mandamos al metod del user.service para guardar con contraseña encriptada
    }

    async login({email, password}: LoginDto) {

        const user = await this.usersService.findByEmailWithPassword(email); //VERIFICAMOS SI EXISTE EL EMAIL Y RETORNA + OTROS DATOS
        
        if(!user) { // SI NO EXISTE EL USUARIO
            throw new UnauthorizedException('Email no encontrado');
        }
        //SI EXISTE
        //Comparamos la contraseña ingresada con la contraseña de la DB
        const isPasswordValid = await bcrypt.compare(password, user.password); //VERIFICAMOS LA CONTRASEÑA

        if(!isPasswordValid) { // SI LA CONTRASEÑA ES INCORRECTA
            throw new UnauthorizedException('password incorrecto');
        }

        //SI LA CONTRASEÑA ES CORRECTA GENERAMOS EL TOKEN PARA EL USUARIO
        const payload = { email: user.email, role: user.role }; //Armamos el payload con los datos que se incluira en el JWT de loguin
        const token = await this.jwtService.signAsync(payload); //generamos el token con jwtService.signAsync(pasamos el payload)

        return {token, email};
    }

    //devuelve datos del usuario
    async profile({email, role}: {email: string; role: string;}) {
        return await this.usersService.findOneByEmail(email);
    }
}
