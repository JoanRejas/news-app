import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    categoryId: number; // Agrega la propiedad categoryId clave de la entidad Category

    @ManyToOne(() => Category, { eager: true })
    @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' }) //mapeamos categoryId a la columna id de la entidad Category
    category: Category;

    // //RELACION DE ESTA ENTIDAD: Many to One
    // @ManyToOne(
    //     () => Category, //Entidad con la que relacionara
    //     (category) => category.id, //columna con la que se relacionara
    //     {eager: true} //Para que traiga todos los registros de la Entidad One, al hacer un findOne desde la entidad Many
    // ) //(nombre de la entidad, columna ID de la entidad One, EXTRA) 
    // category: Category; //Creamos la columna Foraea, referenciando a la Entidad Many

    //Para relacionar el gato con un usuario
    @ManyToOne(() => User) 
    //joinColum sirve para especificar el nombre de la columna donde se almacenara la clave externa
    @JoinColumn({name: 'userEmail', referencedColumnName: 'email',}) // con JoinColunm decimos el nombre de la culumna donde se almacenara una referencia del usuario | y cual sera la referencia, en este caso email
    user: User; //Hacemos referencia a la entidad User

    //creamos la columna donde se almacenara la refencia del usario
    @Column()
    userEmail: string;
}
