import { Module } from "@nestjs/common";
import { SalesController } from "./sales.controller";
import { TenantDataSourceProvider } from "src/core/providers/tenant.provider";
import { TenantDatasourceManager } from "../tenant/tenant-datasource-manager";
import { SalesService } from "./services/sales.service";
import { CustomersService } from "./services/customers.service";

@Module({
   controllers: [SalesController],
   providers: [TenantDataSourceProvider, TenantDatasourceManager, SalesService, CustomersService],
   exports: [SalesService, CustomersService]
})
export class SalesModule {}