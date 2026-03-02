import { Provider, Scope } from "@nestjs/common";
import { TenantDatasourceManager } from "src/modules/tenant/tenant-datasource-manager";
import { tenantStorage } from "src/modules/tenant/tenant-storage";
import { DataSource } from "typeorm";

export const TENANT_DATA_SOURCE = Symbol('TENANT_DATA_SOURCE');

export const TenantDataSourceProvider: Provider<DataSource> = {
    provide: TENANT_DATA_SOURCE,
    scope: Scope.REQUEST,
    inject: [TenantDatasourceManager],
    useFactory: async(manager: TenantDatasourceManager) => {
        const context = tenantStorage.getStore();
        if(!context){
            throw new Error('Tenant context not found');
        }
        return await manager.getDataSource(context.schemaName);
    }
};