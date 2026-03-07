import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity, TenantStatus } from './entities/tenant.entity';

interface CreateTenantParams {
  readonly name: string;
  readonly slug: string;
}

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
  ) {}

  /**
   * Creates a new tenant record with PENDING status.
   */
  async createTenant(params: CreateTenantParams): Promise<TenantEntity> {
    const schemaName = `tenant_${params.slug}`;
    const tenant = this.tenantRepository.create({
      name: params.name,
      slug: params.slug,
      schemaName,
      status: TenantStatus.PENDING,
    });
    return this.tenantRepository.save(tenant);
  }

  /**
   * Finds a tenant by its unique identifier.
   */
  async findById(tenantId: string): Promise<TenantEntity | null> {
    return this.tenantRepository.findOneBy({ id: tenantId });
  }

  /**
   * Updates the provisioning status of a tenant.
   */
  async updateStatus(tenantId: string, status: TenantStatus): Promise<void> {
    await this.tenantRepository.update(tenantId, { status });
  }
  async findAllActive(): Promise<TenantEntity[]> {
    return this.tenantRepository.find({ where: { status: TenantStatus.ACTIVE } });
  }
}
