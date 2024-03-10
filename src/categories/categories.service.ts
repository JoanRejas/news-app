import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { News } from 'src/news/entities/news.entity';

@Injectable()
export class CategoriesService {

constructor(
  @InjectRepository(Category) 
  private readonly catergoryRepository: Repository<Category>,
  @InjectRepository(News)
  private readonly newsRepository: Repository<News>
) {}

async create(createCategoryDto: CreateCategoryDto) {

  await this.validateCategory(createCategoryDto.name);

  return await this.catergoryRepository.save(createCategoryDto);
}

async findAll() {
  return await this.catergoryRepository.find();
}

async findOne(id: number) {
  return await this.catergoryRepository.findOneBy({ id });
}

async update(id: number, updateCategoryDto: UpdateCategoryDto) {

  await this.validateCategory(updateCategoryDto.name);

  return await this.catergoryRepository.update(id,updateCategoryDto);
}

async remove(id: number) {
  // Busca si exista la categoría a eliminar
  const categoryToRemove = await this.findOne(id);

  if (!categoryToRemove) { //si no encontra la categoria
    throw new BadRequestException('Category not found');
  }

  // Busca las noticias asociadas a la categoría
  const associatedNews = await this.newsRepository.find({
    where: { categoryId: categoryToRemove.id } //Las news donde la column categoryId sea la recibida
  });

  // Verifica si hay noticias asociadas
  if (associatedNews.length > 0) {
    throw new BadRequestException('Associated Category');
  }

  // Si no hay noticias asociadas, procede con la eliminación de la categoría
  return await this.catergoryRepository.softDelete({ id: categoryToRemove.id });
}

  /////////////   ALTERNATIVE   ////////////

  private async validateCategory(category: string) {

    const serchCategory = await this.catergoryRepository.findOneBy({ name: category });
    
    if (serchCategory) {
      throw new BadRequestException('Category already exist');
    }

    return serchCategory;
  }
}
