import { User } from './user.entity';
export declare class PaymentHistory {
    id: number;
    subscription: {
        country: string;
        type: string;
    };
    date: Date;
    method: string;
    amount: number;
    status: string;
    user: User;
}
