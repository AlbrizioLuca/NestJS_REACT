import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
    @ApiProperty({example:'4'})
    @IsNumber()
    number: number;

    @ApiProperty({example:'rue'})
    @IsNotEmpty()
    @IsString()
    street_type: string;
    
    @ApiProperty({example:'des Pétunias'})
    @IsNotEmpty()
    @IsString()
    street_name: string;
    
    @ApiProperty({example:`Résidence les Bruyères`})
    @IsOptional()
    @IsString()
    additional: string | null;

    @ApiProperty({example:'34000'})
    @IsNotEmpty()
    @IsString()
    zipcode: string;

    @ApiProperty({example:'Montpellier'})
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({example:'Hérault'})
    @IsNotEmpty()
    @IsString()
    department: string;
}