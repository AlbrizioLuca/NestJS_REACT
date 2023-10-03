import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';


export class CreateCandidateDto {
    @ApiProperty({ example:'Monsieur',})
    @IsNotEmpty()
    @IsString()
    gender: string;
    
    @ApiProperty({ example:'Paul',})
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty({example:'Dubois',})
    @IsNotEmpty()
    @IsString()
    lastname: string;
    
    @ApiProperty({example:'2000-03-23',})
    @IsNotEmpty()
    @IsDate()
    @Column({ type: "date" })
    birthday: Date;

    @ApiProperty({example:'paul-dubois@example.com',})
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiProperty({example:'0610203040',})
    @IsNotEmpty()
    @IsString()
    phone: string;
    
    @ApiProperty({example:'Bac',})
    @IsNotEmpty()
    @IsString()
    diploma: string;

    @ApiProperty({example:'Paie',})
    @IsNotEmpty()
    @IsString()
    domain: string;

    @ApiProperty({example:'Gestionnaire',})
    @IsNotEmpty()
    @IsString()
    profession: string;
    
    @ApiProperty({example:'35000',})
    @IsNotEmpty()
    @IsString()
    salary_pretentions: number;

    @ApiProperty({example:'Marseille',})
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({example:'true',})
    @IsNotEmpty()
    @IsBoolean()
    vehicle: boolean;

    @ApiProperty({example:'false',})
    @IsNotEmpty()
    @IsBoolean()
    rqth: boolean;
}