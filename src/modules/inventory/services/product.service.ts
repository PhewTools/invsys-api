import { Inject, Injectable } from "@nestjs/common";
import { TENANT_DATA_SOURCE } from "src/core/providers/tenant.provider";
import { ProductEntity } from "../entities/product.entity";
import { DataSource, Repository } from "typeorm";
import { CreateProductDto } from "../dto/product.dto";

@Injectable()
export class ProductService {
    private readonly productRepository: Repository<ProductEntity>;
    
    constructor(
        @Inject(TENANT_DATA_SOURCE) dataSource: DataSource,
    ) {
        this.productRepository = dataSource.getRepository(ProductEntity);
    }

    async findAll(): Promise<ProductEntity[]> {
        return this.productRepository.find();
    }

    async findById(id: string): Promise<ProductEntity | null> {
        return this.productRepository.findOneBy({ id });
    }

    async create(dto: CreateProductDto): Promise<ProductEntity> {
        const product = this.productRepository.create(dto);
        return this.productRepository.save(product);
    }
}