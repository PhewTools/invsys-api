import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import type { CreateUserDto } from "./dto/create-user-dto";
import { Public } from "src/core/auth/decorators/public.decorator";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return this.userService.findAll();
    }

    @Post('new')
    @Public()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateUserDto) {
        const users = await this.userService.findAll();
        if(users.length > 0 ){
            throw new BadRequestException('Theres already an admin user created');
        }
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