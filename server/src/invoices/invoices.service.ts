import { Invoices } from '../entities/invoices.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoicesDto } from './dto/create-invoices';
import { User } from 'src/entities/user.entity';

@Injectable()
export class InvoicesService {
  constructor(
  ) { }

  async create(createInvoicesDto: CreateInvoicesDto): Promise<Invoices> {
    const { userId, ...invoicesData } = createInvoicesDto;

    const user = await User.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const invoices = Invoices.create({
      ...invoicesData,
      user, 
    });

    return Invoices.save(invoices);
  }

  async findAll(userId: number): Promise<Invoices[]> {
    return Invoices.find({
      where: { user: { id: userId } },
    });
  }

  findOne(id: number): Promise<Invoices> {
    return Invoices.findOne({ where: { id } });
  }

  async remove(id: number): Promise<string> {
    const invoice = await Invoices.findOne({ where: {id}});

    if (!invoice) {
      throw new NotFoundException(`invoice with ID ${id} not found`);
    }

    await Invoices.delete(id);

    return `invoice with ID ${id} deleted successfully`;
    
  }
}
