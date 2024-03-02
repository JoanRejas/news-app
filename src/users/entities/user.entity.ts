import { Role } from '../../common/enums/rol.enum';
import {Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn} from 'typeorm';

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true, nullable: false})
    email: string

    @Column({default: '18'})
    age: number

    @Column({nullable: false, select: false}) //no acepte valores NULOS, select:false para que no retorne el password al hacer GET
    password: string

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({nullable: true})
    authStrategy: String

    @DeleteDateColumn()
    deleteAt: Date //Eliminacion logica

    //{typo:enum | por defecto cree como admin | todo recibido sea del formato y lo que este en Role de enum}
    @Column({type: 'enum', default: Role.USER, enum: Role}) 
    role: Role
}