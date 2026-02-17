import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({ name: 'categories' })
export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}