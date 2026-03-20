import { TenantDataSourceProvider } from "src/core/providers/tenant.provider";
import { TenantDatasourceManager } from "../tenant/tenant-datasource-manager";
import { InventoryController } from "./inventory.controller";
import { InventoryService } from "./services/inventory.service";
import { Module } from "@nestjs/common";
import { ProductService } from "./services/product.service";
import { CategoryService } from "./services/category.service";
import { SupplierService } from "./services/supplier.service";
@Module({
    imports: [],
    controllers: [InventoryController],
    providers: [InventoryService, TenantDataSourceProvider, TenantDatasourceManager, ProductService, CategoryService, SupplierService],
    exports: [InventoryService, ProductService, CategoryService, SupplierService],
})
export class InventoryModule {}