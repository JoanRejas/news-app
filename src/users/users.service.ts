import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) //inyectamos repositorio para que se comperte con el mismo
        private readonly userRepository: Repository<User>//readonly para que solo utilicemos y no cambiar
    ) {}

    //Los unicos metos que se necesita para hacer el login y register es ek crete y findOneBy

    async create(createUserDto: CreateUserDto) {
        const newUser = this.userRepository.create(createUserDto)
        return await this.userRepository.save(newUser)
        // return this.userRepository.save(createUserDto);
    }

    // RETORNA SI EXISTE EL EMAIL O NO EN LA DB
    async findOneByEmail(email: string) {
        return await this.userRepository.findOneBy({ email });
    }

    // RETORNA SI EXISTE EL EMAIL + otros datos
    findByEmailWithPassword(email: string) { 
        return this.userRepository.findOne({ //Busca
            where: {email}, //cuando el email coincida
            select: ['id', 'email', 'password', 'role'], //y traete estos campos
        });
    }

                    // SOLO OCUPAMOS CREAR Y ENCONTRAR EMAIL
    //-----------------------------------------------------------------------//

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(id: number) {
        return await this.userRepository.findOneBy({ id });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.userRepository.update(id, updateUserDto);
    }

    async remove(id: number) {
        return await this.userRepository.softDelete({ id }); //Eliminacion logica
        //return await this.userRepository.softRemove({ id }); Eliminacion real
    }
}
