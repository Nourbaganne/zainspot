import { Repository } from 'typeorm';
import { Invoices } from '../entities/invoices.entity';
import { CreateInvoicesDto } from './dto/create-invoices';
import { User } from '../entities/user.entity';
export declare class InvoicesService {
    private invoicesRepository;
    private userRepository;
    constructor(invoicesRepository: Repository<Invoices>, userRepository: Repository<User>);
    create(createInvoicesDto: CreateInvoicesDto): Promise<Invoices>;
    findAll(userId: number): Promise<Invoices[]>;
    findOne(id: number): Promise<Invoices>;
    remove(id: number): Promise<String>;
}
