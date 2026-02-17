import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TenantStatus {
  PENDING = 'PENDING',
  PROVISIONING = 'PROVISIONING',
  ACTIVE = 'ACTIVE',
  FAILED = 'FAILED',
  POPULATING = 'POPULATING',
}

@Entity({ schema: 'public', name: 'tenants' })
export class TenantEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ unique: true })
  schemaName: string;

  @Column({
    type: 'enum',
    enum: TenantStatus,
    default: TenantStatus.PENDING,
  })
  status: TenantStatus;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
