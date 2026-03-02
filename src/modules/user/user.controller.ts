import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import type { CreateUserDto } from "./dto/create-user-dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Post('new')
    async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
        return this.userService.create(dto);
    }
}