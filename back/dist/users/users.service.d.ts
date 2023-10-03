import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private usersRepository;
    private readonly JwtService;
    constructor(usersRepository: Repository<User>, JwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<User>;
    private createAuthenticationToken;
    signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<{
        token: string;
    }>;
}
