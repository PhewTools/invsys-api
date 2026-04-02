import { createTenantDataSource } from "src/database/tenant-data-source.factory";
import { TenantService } from "../services/tenant.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Query } from "typeorm/driver/Query.js";

@Injectable()
export class TenantMigrationRunner {
  constructor(private readonly tenantService: TenantService) {}

  public async runForSchema(schemaName: string): Promise<void> {
    const dataSource = await createTenantDataSource(schemaName, false);
    await dataSource.query(`SET search_path TO ${schemaName}, public`);
    try {
      await dataSource.runMigrations({ transaction: 'all' });
    } finally {
      await dataSource.destroy();
    }
  }

  public async runForTenant(tenantId: string): Promise<void> {
    const tenant = await this.tenantService.findById(tenantId);
    if (!tenant) {
      throw new NotFoundException(`Tenant ${tenantId} not found`);
    }
    await this.runForSchema(tenant.schemaName);
  }

  public async runForAllActiveTenants(): Promise<void> {
    const tenants = await this.tenantService.findAllActive(); // add method
    for (const tenant of tenants) {
      await this.runForSchema(tenant.schemaName);
    }
  }
}