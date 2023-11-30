import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; //importamos modulo TOKEN
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service'; 
import { jwtConstants } from './constants/swt.constant'; // de llave SECRETA

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret, //importacion de la llave secreta del TOKEN 
      signOptions: { expiresIn: '1d' },
    }),
  ], //importamos el usersModule para que ucupe sus funciones 
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
