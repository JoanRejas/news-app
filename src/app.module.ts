import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'newsapp',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], //para que cargue cualquier archivo de ts o js que tenga .entity
      autoLoadEntities: true, //para no direccionar manualmente cada una de las entidades
      synchronize: true //para que cree las tablas a partir de las clases
    }),
    UsersModule,
    AuthModule,
    NewsModule,
    CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
