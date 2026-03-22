import { Inject, Injectable } from "@nestjs/common";
import { TENANT_DATA_SOURCE } from "src/core/providers/tenant.provider";
import { DataSource, Repository } from "typeorm";
import { CustomerEntity } from "../entities/customers.entity";

@Injectable()
export class CustomersService {
    private readonly customerRepository: Repository<CustomerEntity>;
    constructor(
        @Inject(TENANT_DATA_SOURCE) dataSource: DataSource,
    ) {
        this.customerRepository = dataSource.getRepository(CustomerEntity);
    }

    async findAll(): Promise<CustomerEntity[]> {
        return this.customerRepository.find();
    }

    async findById(id: string): Promise<CustomerEntity | null> {
        return this.customerRepository.findOneBy({ id });
    }
    
}