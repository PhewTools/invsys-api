import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { TenantService } from '../tenant/tenant.service';
import { TenantEntity, TenantStatus } from '../tenant/entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { ONBOARDING_QUEUE } from './onboarding.constants';
import { createTenantDataSource } from '../../database/tenant-data-source.factory';

@Injectable()
export class OnboardingService {
  private readonly logger = new Logger(OnboardingService.name);

  constructor(
    private readonly tenantService: TenantService,
    @InjectQueue(ONBOARDING_QUEUE) private readonly onboardingQueue: Queue,
  ) {}

  /**
   * Creates a tenant record and enqueues the schema provisioning job.
   */
  async createTenant(dto: CreateTenantDto): Promise<TenantEntity> {
    const tenant = await this.tenantService.createTenant({
      name: dto.name,
      slug: dto.slug,
    });
    await this.onboardingQueue.add('provision-schema', {
      tenantId: tenant.id,
    });
    this.logger.log(`Queued provisioning job for tenant ${tenant.id}`);
    return tenant;
  }


}
