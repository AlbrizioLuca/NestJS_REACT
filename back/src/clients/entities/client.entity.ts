import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('client')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    enterprise: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;
    
    @Column()
    email: string;
    
    @Column()
    phone: string;

    @Column()
    city: string;
}