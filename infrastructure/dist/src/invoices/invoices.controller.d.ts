import { InvoicesService } from './invoices.service';
import { CreateInvoicesDto } from './dto/create-invoices';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    create(createPaymentHistoryDto: CreateInvoicesDto): Promise<import("../entities/invoices.entity").Invoices>;
    findAll(userId: number): Promise<import("../entities/invoices.entity").Invoices[]>;
    findOne(id: number): Promise<import("../entities/invoices.entity").Invoices>;
    remove(id: number): Promise<String>;
}
