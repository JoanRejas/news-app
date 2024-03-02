import { ExecutionContext, createParamDecorator } from "@nestjs/common";

// Decorador para Leer el request y mandarlo como parametro a los endPoint

export const ActiveUser = createParamDecorator( //createParamDecorator funcion que toma una funcion de transformacion
    // ctx:ExecutionContex proporciona informacion sobre el contexto de la solicitud actual, incluido el tipo de contexto (http, rcp,ws,etc)
    (data: unknown, ctx: ExecutionContext) =>  {
        const request = ctx.switchToHttp().getRequest(); //ctx.switchToHttp().getRequest() se accede al objeto de la solicitud HTTP. con switchToHttp() convetimos el contexto actual a HTTP,
        return request.user; //devolvemos la propiedad req.user que contiene la informacion del usuario
    },
);