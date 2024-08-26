export declare class CreatePaymentHistoryDto {
    userId: number;
    subscription: {
        country: string;
        type: string;
    };
    date: Date;
    method: string;
    amount: number;
    status: string;
}
