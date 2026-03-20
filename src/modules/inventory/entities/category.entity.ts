import { PrimaryGeneratedColumn, Column, Entity, OneToMany, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({ name: 'categories' })
export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[] | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}