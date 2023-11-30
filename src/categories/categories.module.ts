import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])], //importamos para cree la tabla 
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [TypeOrmModule] //exportamos porque el modulo One o News necesita acceder al REPOSITORY o metodos de consultas para interactuar (FINDONE AL CREAR UNA NEWS)
})
export class CategoriesModule {}
