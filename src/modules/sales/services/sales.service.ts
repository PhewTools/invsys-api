import { Inject, Injectable } from "@nestjs/common";
import { TENANT_DATA_SOURCE } from "src/core/providers/tenant.provider";
import { DataSource, Repository } from "typeorm";
import { SalesEntity } from "../entities/sales.entity";
import { CreateSaleDto } from "../dto/sales.dto";

@Injectable()
export class SalesService {
    private readonly salesRepository: Repository<SalesEntity>;
    constructor(
        @Inject(TENANT_DATA_SOURCE) dataSource: DataSource,
    ) {
        this.salesRepository = dataSource.getRepository(SalesEntity);
    }

    async findAll(): Promise<SalesEntity[]> {
        return this.salesRepository.find();
    }

    async findById(id: string): Promise<SalesEntity | null> {
        return this.salesRepository.findOneBy({ id });
    }

    async create(dto: CreateSaleDto): Promise<SalesEntity> {
        const sales = this.salesRepository.create(dto);
        return this.salesRepository.save(sales);
    }
}