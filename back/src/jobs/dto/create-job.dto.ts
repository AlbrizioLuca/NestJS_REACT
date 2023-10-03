import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';


export class CreateJobDto {
    @ApiProperty({ example:'Paie',})
    @IsNotEmpty()
    @IsString()
    domain: string;
    
    @ApiProperty({ example:'Responsable RH',})
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({example:'Gestion du service RH pour une PME de 15 salariés',})
    @IsNotEmpty()
    @IsString()
    description: string;
    
    @ApiProperty({example:'2023-08-23',})
    @IsNotEmpty()
    @IsDate()
    @Column({ type: "date" })
    date_publication: Date;

    @ApiProperty({example:'2023-12-01',})
    @IsNotEmpty()
    @IsDate()
    @Column({ type: "date" })
    date_beginning: Date;
    
    @ApiProperty({example:'40000',})
    @IsNotEmpty()
    @IsString()
    salary: number;

    @ApiProperty({example:'CDD',})
    @IsNotEmpty()
    @IsString()
    contract_type: string;

    @ApiProperty({example:'6 mois',})
    @IsString()
    contract_duration: string;
    
    @ApiProperty({example:'Marseille',})
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({example:'true',})
    @IsNotEmpty()
    @IsBoolean()
    remote: boolean;

}