import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateCandidateDto {
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;
    
    @IsNotEmpty()
    @IsString()
    diploma: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsDate()
    @Column({ type: "date" })
    birthday: Date;

    @IsNotEmpty()
    @IsBoolean()
    vehicle: boolean;
}
