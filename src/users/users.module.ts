import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //importamos la entidad USER
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] //exportamos para que pueda utilizar el AUTH
})
export class UsersModule {}
