import { User } from './user.entity';
export declare class Invoices {
    id: number;
    dateIssued: Date;
    dueDate: Date;
    amount: number;
    status: string;
    user: User;
}
