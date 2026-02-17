import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity.js';
import { TenantService } from './tenant.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity])],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
