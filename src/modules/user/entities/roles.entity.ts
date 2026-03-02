import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'roles' })
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true})
    name: string;
}

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
}