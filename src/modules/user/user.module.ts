import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TenantDatasourceManager } from "../tenant/tenant-datasource-manager";
import { TenantDataSourceProvider } from "../../core/providers/tenant.provider";
import { AuthModule } from "src/core/auth/auth.module";
import { AuthGuard } from "src/core/auth/auth.guard";

@Module({
    imports: [AuthModule],
    controllers: [UserController],
    providers: [UserService, TenantDataSourceProvider, TenantDatasourceManager, AuthGuard],
    exports: [UserService],
})
export class UserModule {}