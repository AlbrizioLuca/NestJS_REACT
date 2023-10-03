import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateClientDto {
    @ApiProperty({example:'Dell'})
    @IsNotEmpty()
    @IsString()
    enterprise: string;

    @ApiProperty({example:'Jacques'})
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty({example:'Martin'})
    @IsNotEmpty()
    @IsString()
    lastname: string;
    
    @ApiProperty({example:'Jacques-martin@dell.com'})
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiProperty({example:'0467102030'})
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({example:'Montpellier'})
    @IsNotEmpty()
    @IsString()
    city: string;

}