import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user-dto";
import { DataSource } from "typeorm";
import { TENANT_DATA_SOURCE } from "src/core/providers/tenant.provider";
import { hash } from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { RoleEntity } from "./entities/roles.entity";

@Injectable()
export class UserService {
    private readonly userRepository: Repository<UserEntity>;
    private readonly roleRepository: Repository<RoleEntity>;
    private readonly bcryptSalt: number;

    constructor(
        @Inject(TENANT_DATA_SOURCE) dataSource: DataSource,
        private readonly configService: ConfigService
    ) {
        this.userRepository = dataSource.getRepository(UserEntity);
        this.roleRepository = dataSource.getRepository(RoleEntity);
        this.bcryptSalt = parseInt(this.configService.get<string>('BCRYPT_SALT') ?? '10');
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findOneByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(user: CreateUserDto): Promise<boolean> {
        const hashedPassword = await hash(user.password, this.bcryptSalt) ?? '';
        const newUser = this.userRepository.create({
            ...user,
            password: hashedPassword
        });
        await this.userRepository.save(newUser);
        // Ensure the password is not returned by this method
        return true;
    }

    async getRoles(): Promise<RoleEntity[]> {
        return this.roleRepository.find();
    }
}
