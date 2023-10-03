import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('job')
export class Job {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    domain: string;

    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column({ type: "date" })
    date_publication: Date;
    
    @Column({ type: "date" })
    date_beginning: Date;
    
    @Column()
    salary: number;
     
    @Column()
    contract_type: string;
    
    @Column()
    contract_duration: string
    
    @Column()
    city: string;
    
    @Column()
    remote: boolean;
    
}