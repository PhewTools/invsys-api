import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'suppliers' })
export class SupplierEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    address: string;
}