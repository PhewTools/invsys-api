import { Injectable } from "@nestjs/common";
import { createTenantDataSource } from "src/database/tenant-data-source.factory";
import { DataSource } from "typeorm";

@Injectable()
export class TenantDatasourceManager {
    
    private readonly dataSources = new Map<string, DataSource>();

    async getDataSource(schemaName: string): Promise<DataSource> {

        const existing = this.dataSources.get(schemaName);
        if(existing?.isInitialized){
            return existing;
        }

        const dataSource = await createTenantDataSource(schemaName);
        this.dataSources.set(schemaName, dataSource);
        return dataSource;

    }
}