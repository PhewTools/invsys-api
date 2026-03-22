import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { SalesService } from "./services/sales.service";

@Controller('sales')
export class SalesController {


    constructor(
        private readonly salesService: SalesService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return this.salesService.findAll();
    }
}