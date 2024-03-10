import { forwardRef,Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([News]), forwardRef(() => CategoriesModule)], //1 Importamos la entidad NEWS con TypeOrmModule | CategoriesModule para utilizar el REPOSITORY de CATEGORY
  controllers: [NewsController],
  providers: [NewsService],
  exports: [ TypeOrmModule] //  typeOrmModule porque  CATEGORY necesita acceder a repository de news (para verificar si existe NEWS associated al eliminar)
})
export class NewsModule {}