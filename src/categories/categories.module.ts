import { forwardRef,Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { NewsModule } from 'src/news/news.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), forwardRef(() => NewsModule)], 
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [TypeOrmModule] //TypeOrmModule de CATEGORY porque NEWS necesita acceder al REPOSITORY de CATEGORY (AL CREAR UNA NEWS SE NECESITA ASOCIAR AUNA CATEGOTIA)
})
export class CategoriesModule {}
