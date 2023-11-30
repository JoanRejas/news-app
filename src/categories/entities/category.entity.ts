import { News } from "src/news/entities/news.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    //RELACION DE ESTA ENTIDAD: One to Many
    @OneToMany(
        () => News, 
        (news) => news.category
    ) //(nombre de la entidad, columna ID de la entidad Many)
    news: News[];
}
