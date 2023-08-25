import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('candidate')
export class Candidate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;
    
    @Column()
    diploma: string;
    
    @Column()
    email: string;
    
    @Column()
    phone: string;

    @Column({ type: "date" })
    birthday: Date;

    @Column()
    vehicle: boolean;

    @Column()
    rqth: boolean;
}