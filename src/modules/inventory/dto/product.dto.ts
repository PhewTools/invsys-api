export interface CreateProductDto {
    readonly name: string;
    readonly description: string;
    readonly purchasePrice: number;
    readonly supplierId: string;
    readonly sellingPrice: number;
    readonly imageUrl: string;
    readonly categoryId: string;
}