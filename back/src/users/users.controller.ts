import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@ApiTags('Utilisateurs')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'Créer UN utilisateur' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @ApiOperation({ summary: 'Enregistrer UN utilisateur' })
  // @Post("/sign-up")
  // signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @ApiOperation({ summary: 'Connecter UN utilisateur' })
  @Post("/sign-in")
  signIn(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO) {
  // const { email, password } = authCredentialsDTO;
  return this.usersService.signIn(authCredentialsDTO);
}

  @ApiOperation({ summary: 'Récupérer TOUS les utilisateurs' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer UN utilisateur' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Modifier UN utilisateur' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Supprimer UN utilisateur' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
