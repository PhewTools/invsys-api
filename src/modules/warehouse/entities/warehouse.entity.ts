import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'warehouses' })
export class WarehouseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}