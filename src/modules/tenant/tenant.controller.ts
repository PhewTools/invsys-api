import { Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, Query } from "@nestjs/common";
import { TenantEntity } from "./entities/tenant.entity";
import { TenantService } from "./services/tenant.service";
import { Public } from "src/core/auth/decorators/public.decorator";

@Controller('tenants')
export class TenantController {
    constructor(private readonly tenantService: TenantService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<TenantEntity[]> {
        return this.tenantService.findAllActive();
    }

    @Get('byname')
    @Public()
    @HttpCode(HttpStatus.OK)
    async findIdByName(@Query('name') name: string): Promise<TenantEntity> {
        const tenant = await this.tenantService.findIdByName(name);
        if (!tenant) {
            throw new NotFoundException('Tenant not found');
        }
        return tenant;
    }
    @Get(':id')
    @Public()
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id') id: string): Promise<TenantEntity> {
        const tenant = await this.tenantService.findById(id) ?? null;
        if (!tenant) {
            throw new NotFoundException('Tenant not found');
        }
        return tenant;
    }

}