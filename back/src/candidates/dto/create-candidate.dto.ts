import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { example } from "yargs";


export class CreateCandidateDto {
    @ApiProperty({ example:'Paul',})
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty({example:'Dubois',})
    @IsNotEmpty()
    @IsString()
    lastname: string;
    
    @ApiProperty({example:'Bac',})
    @IsNotEmpty()
    @IsString()
    diploma: string;
    
    @ApiProperty({example:'paul-dubois@example.com',})
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiProperty({example:'0610203040',})
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({example:'2000-03-23',})
    @IsNotEmpty()
    @IsDate()
    @Column({ type: "date" })
    birthday: Date;

    @ApiProperty({example:'true',})
    @IsNotEmpty()
    @IsBoolean()
    vehicle: boolean;
}
