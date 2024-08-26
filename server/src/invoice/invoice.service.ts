import { Invoice } from '../entities/invoice.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoicesDto } from './dto/create-invoices';
import { User } from 'src/entities/user.entity';

@Injectable()
export class InvoiceService {
  constructor(
  ) { }

  async create(createInvoicesDto: CreateInvoicesDto): Promise<Invoice> {
    const { userId, ...invoicesData } = createInvoicesDto;

    const user = await User.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const invoices = Invoice.create({
      ...invoicesData,
      user, 
    });

    return Invoice.save(invoices);
  }

  async findAll(userId: number): Promise<Invoice[]> {
    return Invoice.find({
      where: { user: { id: userId } },
    });
  }

  findOne(id: number): Promise<Invoice> {
    return Invoice.findOne({ where: { id } });
  }

  async remove(id: number): Promise<string> {
    const invoice = await Invoice.findOne({ where: {id}});

    if (!invoice) {
      throw new NotFoundException(`invoice with ID ${id} not found`);
    }

    await Invoice.delete(id);

    return `invoice with ID ${id} deleted successfully`;
    
  }
}
