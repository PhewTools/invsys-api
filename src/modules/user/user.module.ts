import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TenantDatasourceManager } from "../tenant/tenant-datasource-manager";
import { TenantDataSourceProvider } from "../../core/providers/tenant.provider";

@Module({
    controllers: [UserController],
    providers: [UserService, TenantDataSourceProvider, TenantDatasourceManager],
    exports: [UserService],
})
export class UserModule {}