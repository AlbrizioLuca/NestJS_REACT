import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository : Repository<Client>
  ) {}

  async create(createClientDto: CreateClientDto) {
    const newClient = await this.clientsRepository.save(createClientDto)
    return newClient;
  }

  async findAll() {
    const clients = await this.clientsRepository.find()
    return clients;
  }

  async findOne(id: number) {
    const client = await this.clientsRepository.findOneBy({ id: id });
    if(!client){
      throw new NotFoundException(`Aucun client trouvé avec l'id renseigné: ${id}`)
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id)
    await this.clientsRepository.update(id, updateClientDto)
    return client;
  }

  async remove(id: number) {
    const client = await this.findOne(id)
    await this.clientsRepository.delete(id)
    return client;
  }
}
