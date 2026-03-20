import { Inject, Injectable } from "@nestjs/common";
import { TENANT_DATA_SOURCE } from "src/core/providers/tenant.provider";
import { DataSource, Repository } from "typeorm";
import { WarehouseEntity } from "./entities/warehouse.entity";
import { CreateWarehouseDto } from "./dto/create-warehouse.dto";

@Injectable()
export class WarehouseService {

    private readonly warehouseRepository: Repository<WarehouseEntity>;

    constructor(
        @Inject(TENANT_DATA_SOURCE) dataSource: DataSource,
    ) {
        this.warehouseRepository = dataSource.getRepository(WarehouseEntity);
    }

    async findAll(): Promise<WarehouseEntity[]> {
        return this.warehouseRepository.find();
    }

    async findById(id: string): Promise<WarehouseEntity | null> {
        return this.warehouseRepository.findOneBy({ id });
    }

    async create(dto: CreateWarehouseDto): Promise<WarehouseEntity> {
        const warehouse = this.warehouseRepository.create(dto);
        return this.warehouseRepository.save(warehouse);
    }
}