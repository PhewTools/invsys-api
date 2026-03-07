import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger, NotFoundException } from '@nestjs/common';
import { Job } from 'bullmq';
import { DataSource } from 'typeorm';
import { TenantService } from '../tenant/tenant.service';
import { TenantStatus } from '../tenant/entities/tenant.entity';
import { ONBOARDING_QUEUE } from './onboarding.constants';
import { createTenantDataSource } from '../../database/tenant-data-source.factory';

interface ProvisionSchemaPayload {
  readonly tenantId: string;
}

@Processor(ONBOARDING_QUEUE)
export class OnboardingProcessor extends WorkerHost {
  private readonly logger = new Logger(OnboardingProcessor.name);

  constructor(
    private readonly tenantService: TenantService,
  ) {
    super();
  }

  /**
   * Processes the tenant provisioning job: creates the schema and runs migrations.
   */
  async process(job: Job<ProvisionSchemaPayload>): Promise<void> {
    const { tenantId } = job.data;
    this.logger.log(`Processing provisioning for tenant ${tenantId}`);
    const tenant = await this.tenantService.findById(tenantId);
    if (!tenant) {
      throw new Error(`Tenant ${tenantId} not found`);
    }
    try {
      await this.tenantService.updateStatus(tenantId, TenantStatus.PROVISIONING);
      await this.createSchema(tenant.schemaName);
      await this.provisionSchemaTables(tenantId);
      await this.tenantService.updateStatus(tenantId, TenantStatus.ACTIVE);
      this.logger.log(`Tenant ${tenantId} provisioned successfully (schema: ${tenant.schemaName})`);
    } catch (err) {
      this.logger.error(`Failed to provision tenant ${tenantId}`, (err as Error).stack);
      await this.tenantService.updateStatus(tenantId, TenantStatus.FAILED);
      throw err;
    }
  }

  /**
   * Creates a new PostgreSQL schema for the tenant.
   */
  private async createSchema(schemaName: string): Promise<void> {
    const dataSource = await createTenantDataSource('public');
    await dataSource.initialize();
    const queryRunner = dataSource.createQueryRunner();
    try {
      await queryRunner.query(
        `CREATE SCHEMA IF NOT EXISTS "${schemaName}"`,
      );
      this.logger.log(`Schema "${schemaName}" created`);
    } finally {
      await queryRunner.release();
      await dataSource.destroy();
    }
  }
  async provisionSchemaTables(tenantId: string): Promise<void> {
    const tenant = await this.tenantService.findById(tenantId);
    if (!tenant){
      throw new NotFoundException(`Tenant ${tenantId} not found`);
    }
    try {
      await this.tenantService.updateStatus(tenantId, TenantStatus.POPULATING);
      const dataSource = await createTenantDataSource(tenant.schemaName, true);
      const queryRunner = dataSource.createQueryRunner();
      await queryRunner.query(`SET search_path TO ${tenant.schemaName}, public`);
      await queryRunner.query(`INSERT INTO roles (name, description) VALUES ('admin', 'Admin role'), ('user', 'User role');`);
      await queryRunner.query(`INSERT INTO categories (name, description) VALUES ('admin', 'Admin role'), ('user', 'User role');`);
      await queryRunner.release();
      await dataSource.destroy();
    } catch (error) {
      this.logger.error(`Failed to provision schema for tenant ${tenantId}`, error);
      await this.tenantService.updateStatus(tenantId, TenantStatus.FAILED);
      throw error;
    } 
  }
}
