import { Role } from "../types/role";

export interface CreateUserDto {
    readonly email: string;
    readonly password: string;
    readonly name: string;
    readonly role: Role 
}