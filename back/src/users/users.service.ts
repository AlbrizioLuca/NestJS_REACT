import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository : Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.save(createUserDto)
    return newUser;
  }

  async findAll() {
    const users = await this.usersRepository.find()
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id: id });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userUpdated = await this.usersRepository.update(id, updateUserDto)
    return userUpdated;
  }

  async remove(id: number) {
    const userDeleted = await this.usersRepository.delete(id)
    return userDeleted;
  }
}
