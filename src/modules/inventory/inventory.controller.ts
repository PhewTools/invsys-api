import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
import { InventoryService } from "./services/inventory.service";
import type { AddInventoryDto } from "./dto/inventory.dto";
import type { CreateProductDto } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { CategoryService } from "./services/category.service";
import type { CreateCategoryDto } from "./dto/category.dto";
import type { CreateSupplierDto } from "./dto/supplier.dto";
import { SupplierService } from "./services/supplier.service";

@Controller('inventory')
export class InventoryController {
    constructor(
        private readonly inventoryService: InventoryService, 
        private readonly productService: ProductService,
        private readonly categoryService: CategoryService,
        private readonly supplierService: SupplierService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllInventory() {
        return this.inventoryService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createInventory(@Body() dto: AddInventoryDto) {
        return this.inventoryService.create(dto);
    }

    @Get('products')
    @HttpCode(HttpStatus.OK)
    async getAllProducts() {
        return this.productService.findAll();
    }

    @Post('products')
    @HttpCode(HttpStatus.CREATED)
    async createProduct(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Get('categories')
    @HttpCode(HttpStatus.OK)
    async getAllCategories() {
        return this.categoryService.findAll();
    }

    @Post('categories')
    @HttpCode(HttpStatus.CREATED)
    async createCategory(@Body() dto: CreateCategoryDto) {
        return this.categoryService.create(dto);
    }

    @Get('suppliers')
    @HttpCode(HttpStatus.OK)
    async getAllSuppliers() {
        return this.supplierService.findAll();
    }

    @Post('suppliers')
    @HttpCode(HttpStatus.CREATED)
    async createSupplier(@Body() dto: CreateSupplierDto) {
        return this.supplierService.create(dto);
    }
}