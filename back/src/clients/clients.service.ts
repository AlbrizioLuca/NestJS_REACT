import { Injectable } from '@nestjs/common';
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
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const clientUpdated = await this.clientsRepository.update(id, updateClientDto)
    return clientUpdated;
  }

  async remove(id: number) {
    const clientDeleted = await this.clientsRepository.delete(id)
    return clientDeleted;
  }
}
