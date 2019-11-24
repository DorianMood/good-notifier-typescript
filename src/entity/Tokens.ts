import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "tokens"
})
export class Tokens {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 32,
        unique: true
    })
    token: string;

    @Column()
    user_id: number;

    @Column()
    expires: string;

}