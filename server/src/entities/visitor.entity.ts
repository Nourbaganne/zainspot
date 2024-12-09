import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Visitor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    visitorId: string;


    @CreateDateColumn()
    createdAt: Date;

}