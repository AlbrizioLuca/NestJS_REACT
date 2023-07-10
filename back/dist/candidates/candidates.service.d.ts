import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
export declare class CandidatesService {
    private candidatesRepository;
    constructor(candidatesRepository: Repository<Candidate>);
    create(createCandidateDto: CreateCandidateDto): Promise<CreateCandidateDto & Candidate>;
    findAll(): Promise<Candidate[]>;
    findOne(id: number): Promise<Candidate>;
    update(id: number, updateCandidateDto: UpdateCandidateDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
