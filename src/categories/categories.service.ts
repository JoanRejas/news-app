import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

constructor(
  @InjectRepository(Category) 
  private readonly catergoryRepository: Repository<Category>
) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.catergoryRepository.save(createCategoryDto);
  }

  async findAll() {
    return await this.catergoryRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
