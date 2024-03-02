import { Controller, Get, Post, Body, ValidationPipe, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request } from 'express';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

interface RequestWithUser extends Request {
    user: {
        email: string;
        role: string;
    }
}

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register( @Body(new ValidationPipe()) registerDto: RegisterDto) { //recivimos los datos validados del DTO
        console.log(registerDto);
        return this.authService.register(registerDto); //mandamos los datos validaos al servidor
    } 

    @Post('login')
    login( @Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    // @Get('profile')
    // @Roles(Role.Admin) //ponemos el rol que necesita esta ruta para mandarlo al DECORATOR
    // @UseGuards(AuthGuard, RolesGuard)//decoramos para que utilice GUARDS 
    // profile( @Req() req: RequestWithUser) {
    //     return req.user; //mostramos informacion del usuaario autorizado por GUARD
    // }

    //UTILIZANDO AGRUPACION DE DECORADOR
    @Get('profile')
    @Auth(Role.USER) // DECORADORES Auth()
    profile(@ActiveUser() user: UserActiveInterface) {
        return this.authService.profile(user); //mostramos informacion del usuaario autorizado por GUARD
    }
}