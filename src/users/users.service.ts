import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    create(createUserDto: CreateUserDto) {
        const newUser = this.userRepository.create(createUserDto)
        return this.userRepository.save(newUser)
    }

    findOneByEmail(email: string) {
        return this.userRepository.findOneBy({ email });
    }
}
