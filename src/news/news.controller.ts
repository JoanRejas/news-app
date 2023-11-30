import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.newsService.findOne(id);
  }

  @Patch(':id') //el PATCH para modificar solo un dato(ej: solo el nombre) o tambien todos los datos. 
  update(@Param('id') id: number, @Body() updateNewsDto: UpdateNewsDto) { //El PATCH utiliza otro DTO para hacerlo todos opcionales, si utilizamos el DTO de create pedira todos los datos
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.newsService.remove(id);
  }
}
