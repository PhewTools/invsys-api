import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import type { CreateUserDto } from "./dto/create-user-dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return this.userService.findAll();
    }

    @Post('new')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateUserDto) {
        const result = await this.userService.create(dto);
        if(result){
            return {
                message: 'User created successfully'
            };
        }
    }

    @Get('roles')
    @HttpCode(HttpStatus.OK)
    async getRoles(){
        return this.userService.getRoles();
    }
}