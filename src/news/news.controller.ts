import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Auth(Role.USER)
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Post()
  //le pasamos + decorador ActiveUser que cuando se cree una noticia, saque el email del usario
  create(@Body() createNewsDto: CreateNewsDto, @ActiveUser() user: UserActiveInterface) {
    return this.newsService.create(createNewsDto, user);
  }

  //Mandamos la interfas para que cuando consulte las noticias solo se le muestre todas la noticias creo solo el
  @Get()
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.newsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.newsService.findOne(id, user);
  }

  @Patch(':id') //el PATCH para modificar solo un dato(ej: solo el nombre) o tambien todos los datos. 
  update(@Param('id') id: number, @Body() updateNewsDto: UpdateNewsDto, @ActiveUser() user: UserActiveInterface) { //El PATCH utiliza otro DTO para hacerlo todos opcionales, si utilizamos el DTO de create pedira todos los datos
    return this.newsService.update(id, updateNewsDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.newsService.remove(id, user);
  }
}
