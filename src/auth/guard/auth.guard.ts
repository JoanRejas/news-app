import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants/swt.constant';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}

  //canActivate: metodo de NEST que se ejecuta antes de una peticion
  //AUTOIZA LAS RUTAS SEGUN LOS ROLES CAD AVEZ QUE QUEREMOS ACCEDER A UNA RUTA
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) { //S NO EXISTE EL TOKEN
      throw new UnauthorizedException(); //MENSAGE DE NO AUTORIZACION
    }

    try { //S EXISTE EL TOKEN:

      const payload = await this.jwtService.verifyAsync( //accedemos, VERIFICAMOS al servico JWT
        token, //si el token que me envia el cleinte es igual al secreto interno de nuesras constantes
        {
          secret: jwtConstants.secret
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.user = payload;

    } catch { //S NO COINDICE EL TOKEN 'NO AUTORIZA'
      throw new UnauthorizedException();
    }
    // console.log(request.headers.authorization); //accedemos a authorization para saber como fue la auth

    return true; //SI ESTA AUTORIZADO DEVUELVE TRU Y CONTINUA CON LA DIRECCION
  }

  //metodo para extraer el token del HEADEERS
  private extractTokenFromHeader(request: Request): string | undefined {
    
    const [type, token] = request.headers.authorization?.split(' ') ?? []; //deserestructura del array
    return type === 'Bearer' ? token : undefined; //si el typo es Bearer devolvemos el TOEKN sino UNDEFINED
  }
}
