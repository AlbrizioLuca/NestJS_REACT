import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: number;

    @Column()
    street_type: string;
    
    @Column()
    street_name: string;
    
    @Column()
    additional: string;

    @Column()
    zipcode: string;
    
    @Column()
    city: string;

    @Column()
    department: string;
}
