import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../../common/enums/rol.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

// Esta funcion junta más de un decorador para asignarel endPoint

export function Auth(role: Role) { //recibe los distintos roles que hay en el enum

    // applyDecorators: para aplicar varios decoradores al mismo tiempo
    return applyDecorators(
        Roles(role), //tomamos rol especificado en el endPoint profile
        UseGuards(AuthGuard, RolesGuard) //decoramos con guard para veficar el TOKEN de loguin | y RolesGuard para verificar si el usuario tiene el rol que necesita el endPoint
    )
    
} 