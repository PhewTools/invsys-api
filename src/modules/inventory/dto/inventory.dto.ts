export interface AddInventoryDto {
    readonly productId: string;
    readonly quantity: number;
    readonly warehouseId: string;
}

export interface UpdateInventoryDto {
    readonly id: string;
    readonly quantity: number;
}