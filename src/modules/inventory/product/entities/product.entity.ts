import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Column } from "typeorm";
import { CategoryEntity } from "../../category/entities/category.entity";

@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    categoryId: string;

    @ManyToOne(() => CategoryEntity, (category) => category.id)
    @JoinColumn({ name: 'categoryId' })
    category: CategoryEntity;

    @Column()
    description: string;

    @Column()
    purchasePrice: number;

    @Column()
    sellingPrice: number;

    @Column()
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}