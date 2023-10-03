import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('candidate')
export class Candidate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gender: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;
    
    @Column({ type: "date" })
    birthday: Date;
    
    @Column()
    email: string;
     
    @Column()
    phone: string;
    
    @Column()
    diploma: string
    
    @Column()
    domain: string;
    
    @Column()
    profession: string;
    
    @Column()
    salary_pretentions: number;
    
    @Column()
    city: string;

    @Column()
    vehicle: boolean;

    @Column()
    rqth: boolean;
}