import { Body, Controller, Get, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import type { CreateUserDto } from "./dto/create-user-dto";
import { AuthGuard } from "src/core/auth/auth.guard";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Post('new')
    async create(@Body() dto: CreateUserDto) {
        const result =await this.userService.create(dto);
        if(result){
            return {
                status: HttpStatus.CREATED,
                message: 'User created successfully'
            };
        }
    }

    @UseGuards(AuthGuard)
    @Get('roles')
    async getRoles(){
        return this.userService.getRoles();
    }
}