import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([News]), CategoriesModule], //importamos el TypeORM del Modulo One o Category que exportamos
  controllers: [NewsController],
  providers: [NewsService, CategoriesService] //añadimos el CategoriesService por la RELACION
})
export class NewsModule {}
