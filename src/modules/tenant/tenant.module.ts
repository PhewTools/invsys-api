import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { TenantService } from './services/tenant.service';
import { TenantMigrationRunner } from './services/tenant-migration.service';
import { TenantController } from './tenant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity])],
  controllers: [TenantController],
  providers: [TenantService, TenantMigrationRunner],
  exports: [TenantService, TenantMigrationRunner],
})
export class TenantModule {}
