import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SalesEntity } from "./sales.entity";
import { ProductEntity } from "src/modules/inventory/entities/product.entity";

@Entity('sales_items')
export class SalesItemEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    saleId: string;

    @ManyToOne(() => SalesEntity, (sales) => sales.id)
    @JoinColumn({ name: 'saleId'})
    sale: SalesEntity;

    @Column()
    productId: string;

    @ManyToOne(() => ProductEntity, (product) => product.id)
    @JoinColumn({ name: 'productId'})
    product: ProductEntity;

    @Column()
    quantity: number;

    @Column()
    unitPrice: number;

    @Column()
    totalPrice: number;
}