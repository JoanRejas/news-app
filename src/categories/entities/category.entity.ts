import { News } from "src/news/entities/news.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @DeleteDateColumn()
    deleteAt: Date;

    //RELACION DE ESTA ENTIDAD: One to Many
    @OneToMany(
        () => News, 
        (news) => news.category
    ) //(nombre de la entidad, columna ID de la entidad Many)
    news: News[]; //referenciamos la relacion
}
