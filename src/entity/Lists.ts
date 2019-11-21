import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "lists"
})
export class Lists {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 64
    })
    name: string;

    @Column()
    user_id: number;

}