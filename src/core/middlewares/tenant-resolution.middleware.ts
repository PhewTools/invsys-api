import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ConfigService } from '@nestjs/config';
import { TenantService } from "../../modules/tenant/tenant.service";
import { TenantStatus } from "src/modules/tenant/entities/tenant.entity";
import { tenantStorage } from "src/modules/tenant/tenant-storage";


@Injectable()
export class TenantResolutionMiddleware implements NestMiddleware {
    constructor(private readonly configService: ConfigService, private readonly tenantService: TenantService) {}
    async use(req: Request, res: Response, next: NextFunction) {

        // THIS METHOD IS ONLY FOR DEVELOPMENT
        const tenantIdHeader: string | undefined = req.header('X-Tenant-Id');

        if(!tenantIdHeader){
            throw new BadRequestException('X-Tenant-Id header is required');
        }
        const tenant = await this.tenantService.findById(tenantIdHeader);

        if(!tenant || tenant.status !== TenantStatus.ACTIVE){
            throw new BadRequestException('Invalid tenant ID');
        }
        tenantStorage.run({ tenantId: tenant.id, schemaName: tenant.schemaName }, () => {
            next();
        });

        // THIS SHOULD BE THE PRODUCTION    CODE
        // const baseDomain = this.configService.get<string>('BASE_DOMAIN') ?? 'invsys.phewtools.com';
        // const host = req.hostname;

        // if (!host.endsWith(`.${baseDomain}`)) {
        //     throw new BadRequestException('Invalid tenant name');
        // }
        // const tenantSlug = host.slice(0, -(baseDomain.length + 1));
        // if (!tenantSlug || tenantSlug.includes('.')) {
        //     throw new BadRequestException('Invalid tenant name');
        // }
        // req['tenantSlug'] = tenantSlug;
        // next();
    }
}