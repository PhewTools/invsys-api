import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Column } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { SupplierEntity } from "./supplier.entity";

@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    supplierId: string;

    @ManyToOne(() => SupplierEntity, (supplier) => supplier.id)
    @JoinColumn({ name: 'supplierId' })
    supplier: SupplierEntity;

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

    @Column({ nullable: true})
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}