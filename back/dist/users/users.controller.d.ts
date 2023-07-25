import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createOrSignUp(createUserDto: CreateUserDto): Promise<CreateUserDto & import("./entities/user.entity").User>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<import("./entities/user.entity").User>;
    signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<{
        token: string;
    }>;
}
