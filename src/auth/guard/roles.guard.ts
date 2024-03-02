import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/rol.enum';

// GUARD para verificar si el rol del usuario coincide con el rol asocido al endPoint

@Injectable()
export class RolesGuard implements CanActivate { //implements significa que el guardia implemente un Canactive que devuelve un boleano

  constructor(private readonly reflector: Reflector) {} // el reflector nos permite leer el rol

  canActivate(
    context: ExecutionContext, // Recibe un ExecutionContext que proporciona acceso al contexto de la solicitud actual
  ): boolean {
    //con reflector leemos los roles asocisdos con el endponit actual
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY,[context.getHandler(), context.getClass()]);

    if (!role) { //SI no existe roles asociados
      return true; //dejamos abierto la entrada
    }

    //PBTENEMOS ACCESO AL ROL DEL USUARIO, accediendo al request del mismo usuario logueado
    const {user} = context.switchToHttp().getRequest();

    //configuracion para ue todo lo que haga el rol USER poodrá hacer el rol ADMIN
    if(user.role === Role.ADMIN) {
      return true;
    }

    // Verificamos si rol del usuario coincide con el rol asociado al endPonit
    return role === user.role; //SI COINCIDE RETORNA (TRUE) SI NO (FALSE)
  }
}