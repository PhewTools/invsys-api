import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerEntity } from "./customers.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { PaymentStatus } from "../enum/PaymentStatus";

@Entity('sales')
export class SalesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    customerId: string;

    @ManyToOne(() => CustomerEntity, (customer) => customer.id)
    @JoinColumn({ name: 'customerId'})
    customer: CustomerEntity;

    @Column()
    userId: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'userId'})
    user: UserEntity;

    @Column()
    totalAmount: number;

    @Column()
    paymentStatus: PaymentStatus;

    @CreateDateColumn()
    createdAt: Date;
}