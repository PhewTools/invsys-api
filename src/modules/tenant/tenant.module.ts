import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { TenantService } from './tenant.service';
import { TenantMigrationRunner } from './tenant-migration.service';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity])],
  providers: [TenantService, TenantMigrationRunner],
  exports: [TenantService, TenantMigrationRunner],
})
export class TenantModule {}
