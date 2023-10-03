import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository : Repository<Job>
  ) {}

  async create(createClientDto: CreateJobDto) {
    const newJob = await this.jobsRepository.save(createClientDto)
    return newJob;
  }

  async findAll() {
    const clients = await this.jobsRepository.find()
    return clients;
  }

  async findOne(id: number) {
    const job = await this.jobsRepository.findOneBy({ id: id });
    if(!job){
      throw new NotFoundException(`Aucune offre d'emploi trouvée avec l'id renseigné: ${id}`)
    }
    return job;
  }

  async update(id: number, updateClientDto: UpdateJobDto) {
    const job = await this.findOne(id)
    await this.jobsRepository.update(id, updateClientDto)
    return job;
  }

  async remove(id: number) {
    const job = await this.findOne(id)
    await this.jobsRepository.delete(id)
    return job;
  }
}
