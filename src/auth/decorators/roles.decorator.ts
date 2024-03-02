import { SetMetadata } from "@nestjs/common";
import { Role } from "../../common/enums/rol.enum";

export const ROLES_KEY = 'roles';

//este controlador obtiene el metadato del rol asignado al endpoint

// SetMetadata(key, value) se utiliza para asignar metadatos personalizados a los ontroladores, controladores de metodos o parametrosde un método.
// (role) captura el rol del endpoint | SetMetadata() para agregar una metadata adicional con la key 'role'
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role); //obtenemos el rol requerido del endpoint
