import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({example:'Pierre'})
    @IsNotEmpty()
    @IsString()
    firstname: string;
    
    @ApiProperty({example:'Leroux'})
    @IsNotEmpty()
    @IsString()
    lastname: string;
    
    @ApiProperty({example:'pierre_leroux@example.com'})
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiProperty({example:'1MotdePasse?', minLength:8})
    @IsNotEmpty()
    @IsString()
    @Length(8,255)
    password: string;

    @ApiProperty({example:'Consultant'})
    @IsNotEmpty()
    @IsString()
    role: string;
}