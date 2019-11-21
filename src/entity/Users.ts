import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "users"
})
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 64
    })
    name: string;

    @Column({
        length: 32
    })
    account_code: string;

    @Column({
        length: 8
    })
    color: string;
    
}