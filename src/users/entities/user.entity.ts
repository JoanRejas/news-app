import {Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn} from 'typeorm';

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true, nullable: false})
    email: string

    @Column({default: '18'})
    age: number

    @Column({nullable: false}) //no acepte valores NULOS
    password: string

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({nullable: true})
    authStrategy: String

    @DeleteDateColumn()
    deleteAt: Date; //Eliminacion logica

    @Column({default: 'admin'}) //por defecto user
    rol: string
}