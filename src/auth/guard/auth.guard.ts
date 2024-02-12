import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants/swt.constant';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}

  //canActivate: metodo de NEST que se ejecuta antes de una peticion
  //AUTORIZA LAS RUTAS SEGUN LOS ROLES CADA VEZ QUE QUEREMOS ACCEDER A UNA RUTA

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest(); //Recibimos lo que envia el usuario
    const token = this.extractTokenFromHeader(request); //verificamos si existe el token que nos envian

    if (!token) { //Si NO EXISTE EL TOKEN
      throw new UnauthorizedException(); //MENSAGE DE NO AUTORIZACION
    }

    try { //S EXISTE EL TOKEN:

      const payload = await this.jwtService.verifyAsync( // verifyAsync obtiene el token del usuario y el secreto interno, metodo para verificar si el token JWT proporcionado es válido. Es una funcion asincrono que devuelve el payload del token si la verificacion es exitosa
        token, // token del usuario logueado
        {
          secret: jwtConstants.secret // SECRETO INTERNO
        }
      );
      
      //le agregamos una propiedad user al request = payload contiene informacion del usuario logueado
      request.user = payload;

    } catch { //S NO COINDICE EL TOKEN 'NO AUTORIZA'
      throw new UnauthorizedException();
    }
    // console.log(request.headers.authorization); //accedemos a authorization para saber como fue la auth

    return true; //SI ESTA AUTORIZADO DEVUELVE TRU Y CONTINUA CON LA DIRECCION
  }

  //metodo para extraer el token del HEADER. El token que se le genera al usuario cuando inicia sesión
  private extractTokenFromHeader(request: Request): string | undefined {

    // = si el token es nulo o undefined el proceso se cortara aqui?. 
    // | split('') divide la cadena del encabezado utilizando el espacio como separador 
    // | ??[] este operador  significa que si el resultado de split() es null o undefined, se utilizara un array vacio en su lugar. Significa que siempre habra array como resultado incluso si no esta presente o no tiene ele formato
    const [type, token] = request.headers.authorization?.split(' ') ?? []; //deserestructura del array

    // Bearer es un tipo de AUTENTICATION
    return type === 'Bearer' ? token : undefined; //si el typo es Bearer devolvemos el TOEKN si no UNDEFINED
  }
}
