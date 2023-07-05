import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @IsDate()
    birthday: Date;

    @IsNotEmpty()
    @IsBoolean()
    vehicle: boolean;
}
