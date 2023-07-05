import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private candidatesRepository : Repository<Candidate>
  ) {}

  async create(createCandidateDto: CreateCandidateDto) {
    const newCandidate = await this.candidatesRepository.save(createCandidateDto)
    return newCandidate;
  }

  async findAll() {
    const candidates = await this.candidatesRepository.find()
    return candidates;
  }

  async findOne(id: number) {
    const candidate = await this.candidatesRepository.findOneBy({ id_candidate: id });
    return candidate;
  }

  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    const candidateUpdated = await this.candidatesRepository.update(id, updateCandidateDto)
    return candidateUpdated;
  }

  async remove(id: number) {
    const candidateDeleted = await this.candidatesRepository.delete(id)
    return candidateDeleted;
  }
}
