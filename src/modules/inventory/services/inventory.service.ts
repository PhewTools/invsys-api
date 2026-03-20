import { Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InventoryEntity } from "../entities/inventory.entity";
import { TENANT_DATA_SOURCE } from "src/core/providers/tenant.provider";
import { AddInventoryDto } from "../dto/inventory.dto";

@Injectable()
export class InventoryService {
    private readonly inventoryRepository: Repository<InventoryEntity>;
    constructor(

        @Inject(TENANT_DATA_SOURCE) dataSource: DataSource,
    ) {
        this.inventoryRepository = dataSource.getRepository(InventoryEntity);
    }

    async findAll() {
        return this.inventoryRepository.find({relations: ['product', 'warehouse']});
    }

    async create(dto: AddInventoryDto) {
        const inventory = this.inventoryRepository.create(dto);
        return this.inventoryRepository.save(inventory);
    }
}