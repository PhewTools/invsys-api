import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { WarehouseService } from "./warehouse.service";
import type { CreateWarehouseDto } from "./dto/create-warehouse.dto";

@Controller('warehouses')
export class WarehouseController {
    constructor(private readonly warehouseService: WarehouseService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return this.warehouseService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateWarehouseDto) {
        return this.warehouseService.create(dto);
    }
}