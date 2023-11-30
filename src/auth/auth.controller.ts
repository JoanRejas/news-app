import { Controller, Get, Post, Body, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guard/auth.guard';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register( @Body(new ValidationPipe()) registerDto: RegisterDto) { //recivimos los datos validados del DTO
        return this.authService.register(registerDto); //mandamos los datos validaos al servidor
    } 

    @Post('login')
    login( @Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard)//decoramos para que utilice GUARDS
    profile( @Request() req) {
        return req.user;
    }
}
