import { PaymentHistoryService } from './payment-history.service';
import { CreatePaymentHistoryDto } from './dto/create-payment-history';
export declare class PaymentHistoryController {
    private readonly paymentHistoryService;
    constructor(paymentHistoryService: PaymentHistoryService);
    create(createPaymentHistoryDto: CreatePaymentHistoryDto): Promise<import("../entities/payment-history.entity").PaymentHistory>;
    findAll(userId: number): Promise<import("../entities/payment-history.entity").PaymentHistory[]>;
    findOne(id: number): Promise<import("../entities/payment-history.entity").PaymentHistory>;
    remove(id: number): Promise<String>;
}
