export interface CreateSupplierDto {
    readonly name: string;
    readonly email?: string;
    readonly phone?: string;
    readonly address?: string;
}