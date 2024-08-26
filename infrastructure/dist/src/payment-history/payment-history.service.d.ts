import { Repository } from 'typeorm';
import { PaymentHistory } from '../entities/payment-history.entity';
import { CreatePaymentHistoryDto } from './dto/create-payment-history';
import { User } from '../entities/user.entity';
export declare class PaymentHistoryService {
    private paymentHistoryRepository;
    private userRepository;
    constructor(paymentHistoryRepository: Repository<PaymentHistory>, userRepository: Repository<User>);
    create(createPaymentHistoryDto: CreatePaymentHistoryDto): Promise<PaymentHistory>;
    findAll(userId: number): Promise<PaymentHistory[]>;
    findOne(id: number): Promise<PaymentHistory>;
    remove(id: number): Promise<String>;
}
