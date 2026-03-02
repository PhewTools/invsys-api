import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user-dto";
import { User } from "./types/user";
import { DataSource } from "typeorm";
import { TENANT_DATA_SOURCE } from "src/core/providers/tenant.provider";

@Injectable()
export class UserService {
    private readonly userRepository: Repository<UserEntity>;

    constructor(
        @Inject(TENANT_DATA_SOURCE) dataSource: DataSource
    ) {
        this.userRepository = dataSource.getRepository(UserEntity);
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async create(user: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }
}