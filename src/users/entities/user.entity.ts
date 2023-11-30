import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column({nullable: false}) //no acepte valores NULOS
    password: string

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({nullable: true})
    authStrategy: String

    @Column({default: 'user'}) //pormdefecto user
    rol: string
}