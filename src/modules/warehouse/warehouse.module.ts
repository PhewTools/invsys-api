import { Module } from "@nestjs/common";
import { WarehouseService } from "./warehouse.service";
import { WarehouseController } from "./warehouse.controller";
import { TenantDatasourceManager } from "../tenant/tenant-datasource-manager";
import { TenantDataSourceProvider } from "src/core/providers/tenant.provider";

@Module({
    controllers: [WarehouseController],
    providers: [WarehouseService, TenantDatasourceManager, TenantDataSourceProvider],
    exports: [WarehouseService],
})
export class WarehouseModule {}