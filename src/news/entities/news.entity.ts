import { Category } from "src/categories/entities/category.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class News {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 150})
    title: string;

    @Column()
    subtitle: string;

    @Column({type: 'text'})
    description: string;

    @DeleteDateColumn() //Para eliminacion LOGICA, coloca la fecha cuando se elimine el registro
    deletedAt: Date;

    //RELACION DE ESTA ENTIDAD: Many to One
    @ManyToOne(
        () => Category, //Entidad con la que relacionara
        (category) => category.id, //columna con la que se relacionara
        {eager: true} //Para que traiga todos los registros de la Entidad One, al hacer un findOne desde la entidad Many
    ) //(nombre de la entidad, columna ID de la entidad One, EXTRA) 
    category: Category; //Creamos la columna Foraea, referenciando a la Entidad Many
}
