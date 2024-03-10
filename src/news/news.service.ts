import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';

@Injectable()
export class NewsService {

  constructor(
    @InjectRepository(News) //Inyectanmos el repository para hacer consultas en la DB de esta Entidad NEWS
    private readonly newsRepository: Repository<News>,

    @InjectRepository(Category) //para hacer consultas en la tabla categoria al CREATE O UPDATE
    private readonly catergoryRepository: Repository<Category>
  ) {}

  async create(createNewsDto: CreateNewsDto, user: UserActiveInterface) { //+ recivimos el user de tipo interface

    const category = await this.validateCategory(createNewsDto.category);    //verificamos si existe la category

    return await this.newsRepository.save({ //si existe la categoria
      ...createNewsDto, //Pasamos la INSTANCIA de lo que nos devolvio la BUSQUEDA
      category: category,          // Y pasamos la CATEGORIA
      userEmail: user.email, //pasamos el email del usario
    }); //GUARDAMOS EN LA NEWS EN LA DB
  }

  async findAll(user: UserActiveInterface) { //Ponemos
    if(user.role === Role.ADMIN) { //Si el usuario es el superAdmin
      return await this.newsRepository.find(); //Todos las noticias
    }
    return await this.newsRepository.find({ //Busque todos los que coinciden con el email
      where: { userEmail: user.email },
    });
  }

  //Buscamos y verificamos si coincide con el user
  async findOne(id: number, user: UserActiveInterface) {

    const news = await this.newsRepository.findOneBy({ id }); //buscamos la news

    if (!news) { //si la news no existe
      throw new BadRequestException('News not found');
    }

    //verifica si el registro coincide o no con el user
    this.validateOwnership(news, user);

    return news; //Si pasa todo lo anterios devuelve la noticia

  }

  async update(id: number, updateNewsDto: UpdateNewsDto, user: UserActiveInterface) {

    const serchNews = await this.findOne(id, user); //buscamos la news y verificamos si coincide con el user

    return await this.newsRepository.update(
      id, //pasamos el id de la news
      {
        ...updateNewsDto, //le paso la copia o datos que manda el user
        category: updateNewsDto.category ? await this.validateCategory(updateNewsDto.category) : undefined, // preguntamos si manda la categoria ? si manda verificamos si existe: si no indefinido 
        userEmail: serchNews.userEmail, //Mantenemos el mismo userEmail del creador de la news
        
      },
    ); //UPDATE recibe dos argumntos el id y los datos

    // CORREGIR: cuando el rol ADMIN actuliza las news de otros roles direrente, tambien se le edita el userEmail de la news con el email del ADMIN
  }

  async remove(id: number, user: UserActiveInterface) {

    await this.findOne(id, user); //buscamos la news y verificamos si coincide con el user

    //a softDelete se le pase el ID y al softRevome la instancia. (eje: instacia de busqueda)
    return await this.newsRepository.softDelete({ id }); //softDelete: hace una aliminacion logica poniendo una fecha de eliminacion en la columna determinada del ID que le mandemos
  }

  //////////////  PRINCIPIOS SOLID ///////////////

  //Verifica si existe la category
  private async validateCategory(category: string) {

    const categoryEntity = await this.catergoryRepository.findOneBy({ //hacemos uso de la columna category de la entidad NEWS
      name: category
    }); //buscamos si esxiste la categoria ingreasada en la entidad CAtegory

    if (!categoryEntity) { //si no existe la categoria
      throw new BadRequestException('Category not found');
    }

    return categoryEntity;
  }

  //funcion para verificar si el registro le pertenece o no al usuario
  private validateOwnership(news: News, user: UserActiveInterface) {

    //si el rol es USER && el userEmail de la noticia NO coincide con el email del user
    if(user.role !== Role.ADMIN && news.userEmail !== user.email) {
      throw new UnauthorizedException('No autorizado');
    }
  }
}
