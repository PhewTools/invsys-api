import { Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SupplierEntity } from "../entities/supplier.entity";
import { TENANT_DATA_SOURCE } from "src/core/providers/tenant.provider";
import { CreateSupplierDto } from "../dto/supplier.dto";

@Injectable()
export class SupplierService {
    private readonly supplierRepository: Repository<SupplierEntity>;
    
    constructor(
        @Inject(TENANT_DATA_SOURCE) dataSource: DataSource,
    ) {
        this.supplierRepository = dataSource.getRepository(SupplierEntity);
    }

    async findAll(): Promise<SupplierEntity[]> {
        return this.supplierRepository.find();
    }

    async findById(id: string): Promise<SupplierEntity | null> {
        return this.supplierRepository.findOneBy({ id });
    }
    
    async create(dto: CreateSupplierDto): Promise<SupplierEntity> {
        const supplier = this.supplierRepository.create(dto);
        return this.supplierRepository.save(supplier);
    }
}