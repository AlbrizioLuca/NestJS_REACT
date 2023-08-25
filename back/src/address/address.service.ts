import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository : Repository<Address>
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const newAddress = await this.addressRepository.save(createAddressDto)
    return newAddress;
  }

  async findAll() {
    const address = await this.addressRepository.find()
    return address;
  }

  async findOne(id: number) {
    const address = await this.addressRepository.findOneBy({ id: id });
    if(!address){
      throw new NotFoundException(`Aucune adresse trouvée avec l'id renseigné: ${id}`)
    }
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.findOne(id)
    await this.addressRepository.update(id, updateAddressDto)
    return address;
  }

  async remove(id: number) {
    const address = await this.findOne(id)
    await this.addressRepository.delete(id)
    return address;
  }
}