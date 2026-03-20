import { Inject, Injectable } from "@nestjs/common";
import { CategoryEntity } from "../entities/category.entity";
import { TENANT_DATA_SOURCE } from "src/core/providers/tenant.provider";
import { DataSource, Repository } from "typeorm";
import { CreateCategoryDto } from "../dto/category.dto";

@Injectable()
export class CategoryService {
    private readonly categoryRepository: Repository<CategoryEntity>;
    constructor(
        @Inject(TENANT_DATA_SOURCE) dataSource: DataSource,
    ) {
        this.categoryRepository = dataSource.getRepository(CategoryEntity);
    }

    async findAll(): Promise<CategoryEntity[]> {
        return this.categoryRepository.find();
    }

    async findById(id: string): Promise<CategoryEntity | null> {
        return this.categoryRepository.findOneBy({ id });
    }

    async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
        const category = this.categoryRepository.create(dto);
        return this.categoryRepository.save(category);
    }
}