import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash, compare } from 'bcryptjs';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository : Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Encoder le mot de passe
    createUserDto.password = await hash(createUserDto.password, 10);
    // Enregistre le nouveau user dans la DB
    const newUser = await this.usersRepository.save(createUserDto)
    return newUser;
  }


  async signIn(authCredentialsDTO: AuthCredentialsDTO){
    let user : User;
    const email = authCredentialsDTO.email;
    try {
      user = await this.usersRepository.findOneBy({ email : email },);
    } catch (error) {
      throw new NotFoundException(`Aucun utilisateur trouvé avec cet email : ${email} `)
    }
    const passwordMatch = await compare(authCredentialsDTO.password, user.password);
  
    if (!passwordMatch) {
      throw new NotFoundException('Les données fournies sont invalides')    
    }
    return {message: `Vous êtes connecté avec succès` }
  }


  async findAll() {
    const users = await this.usersRepository.find()
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id: id });
    if(!user){
      throw new NotFoundException(`Aucun candidat trouvé avec l'id renseigné: ${id}`)
    }
    return user;
  }

  async update(id: number, updateCandidateDto: UpdateUserDto) {
    const user = await this.findOne(id)
    await this.usersRepository.update(id, updateCandidateDto)
    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    await this.usersRepository.delete(id)
    return user;
  }
}
