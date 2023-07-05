import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('candidate')
export class Candidate {
    @PrimaryGeneratedColumn()
    id_candidate: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;
    
    @Column()
    diploma: string;
    
    @Column()
    email: string;
    
    @Column()
    phone: number;

    @Column()
    birthday: Date;

    @Column()
    vehicle: boolean;
}