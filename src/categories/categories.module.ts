import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])], //importamos para cree la tabla 
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [TypeOrmModule] //exportamos porque el el TypeOrm de News porque NEWS necesita acceder al REPOSITORY de CATEGORY (AL CREAR UNA NEWS SE NECESITA ASOCIAR AUNA CATEGOTIA)
})
export class CategoriesModule {}
