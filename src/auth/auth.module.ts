import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; //importamos de NESTJS 
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service'; 
import { jwtConstants } from './constants/swt.constant'; // de llave SECRETA

@Module({
  imports: [
    UsersModule, //No importamos el UsersService porque al importar el el UsersModule ya esta exportando el userService
    JwtModule.register({ //Configuramos antes de generar el token
      global: true, //indivacomos que cualquier servicio puedes utilizar JWT
      secret: jwtConstants.secret, //importacion de la llave secreta del TOKEN de la carpeta constants
      signOptions: { expiresIn: '1d' }, //Tiempo de expiracion del TOKEN
    }),
  ], //importamos el usersModule para que ucupe sus funciones 
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
