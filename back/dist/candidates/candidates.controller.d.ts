import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
export declare class CandidatesController {
    private readonly candidatesService;
    constructor(candidatesService: CandidatesService);
    create(createCandidateDto: CreateCandidateDto): Promise<CreateCandidateDto & import("./entities/candidate.entity").Candidate>;
    findAll(): Promise<import("./entities/candidate.entity").Candidate[]>;
    findOne(id: string): Promise<import("./entities/candidate.entity").Candidate>;
    update(id: string, updateCandidateDto: UpdateCandidateDto): Promise<import("./entities/candidate.entity").Candidate>;
    remove(id: string): Promise<import("./entities/candidate.entity").Candidate>;
}
