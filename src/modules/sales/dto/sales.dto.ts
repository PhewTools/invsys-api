import { PaymentStatus } from "../enum/PaymentStatus";

export interface CreateSaleDto {
    readonly customerId: string;
    readonly userId: string;
    readonly totalAmount: number;
    readonly paymentStatus: PaymentStatus;
}