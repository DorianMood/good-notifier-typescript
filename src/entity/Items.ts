import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "items"
})
export class Items {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 64
    })
    name: string;

    @Column()
    list_id: number;

    @Column({
        length: 256
    })
    link: string;

}