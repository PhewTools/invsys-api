import { WarehouseEntity } from "src/modules/warehouse/entities/warehouse.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({ name: 'inventory' })
export class InventoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productId: string;

    @Column()
    warehouseId: string;

    @ManyToOne(() => ProductEntity, (product) => product.id)
    @JoinColumn({ name: 'productId' })
    product: ProductEntity;

    @ManyToOne(() => WarehouseEntity, (warehouse) => warehouse.id)
    @JoinColumn({ name: 'warehouseId' })
    warehouse: WarehouseEntity;

    @Column()
    quantity: number;

    @UpdateDateColumn()
    updatedAt: Date;

}