import { Controller, Get, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';

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

    @Get('profile')
    @UseGuards(AuthGuard)//decoramos para que utilice GUARDS 
    profile( @Req() req: RequestWithUser) {
        return req.user; //mostramos informacion del usuaario autorizado por GUARD
    }
}
