import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {

  constructor(
    @InjectRepository(News) //Para hacer consultas en la DB de esta Entidad
    private readonly newsRepository: Repository<News>,

    @InjectRepository(Category) //para hacer consultas en la tabla categoria al CREATE O UPDATE
    private readonly catergoryRepository: Repository<Category>
  ) {}

  async create(createNewsDto: CreateNewsDto) {

    const category = await this.catergoryRepository.findOneBy({ //hacemos uso de la columna category de la entidad NEWS
      name: createNewsDto.category
    }); //buscamos si esxiste la categoria ingreasada en la entidad CAtegory

    if(!category) { //si no existe la categoria
      throw new BadRequestException('Category not found');
    }

    return await this.newsRepository.save({ //si existe la categoria
      ...createNewsDto, //Pasamos la INSTANCIA de lo que nos devolvio la BUSQUEDA
      category          // Y pasamos la CATEGORIA
    }); //GUARDAMOS EN LA NEWS EN LA DB
  }

  async findAll() {
    return await this.newsRepository.find();
  }

  async findOne(id: number) {
    return await this.newsRepository.findOneBy({ id });
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    // return await this.newsRepository.update(id, updateNewsDto); //UPDATE recibe dos argumntos el id y los datos
  }

  async remove(id: number) {
    //a softDelete se le pase el ID y al softRevome la instancia. (eje: instacia de busqueda)
    return await this.newsRepository.softDelete({ id }); //softDelete: hace una aliminacion logica poniendo una fecha de eliminacion en la columna determinada del ID que le mandemos
  }
}
