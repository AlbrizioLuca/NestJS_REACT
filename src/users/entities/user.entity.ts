import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;

}
