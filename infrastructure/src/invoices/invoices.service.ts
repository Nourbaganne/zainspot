import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoices } from '../entities/invoices.entity';
import { CreateInvoicesDto } from './dto/create-invoices';
import { User } from '../entities/user.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoices)
    private invoicesRepository: Repository<Invoices>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createInvoicesDto: CreateInvoicesDto): Promise<Invoices> {
    const { userId, ...invoicesData } = createInvoicesDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const invoices = this.invoicesRepository.create({
      ...invoicesData,
      user, 
    });

    return this.invoicesRepository.save(invoices);
  }

  async findAll(userId: number): Promise<Invoices[]> {
    return this.invoicesRepository.find({
      where: { user: { id: userId } },
    });
  }

  findOne(id: number): Promise<Invoices> {
    return this.invoicesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<String> {
    const invoice = await this.invoicesRepository.findOne({ where: {id}});

    if (!invoice) {
      throw new NotFoundException(`invoice with ID ${id} not found`);
    }

    await this.invoicesRepository.delete(id);

    return `invoice with ID ${id} deleted successfully`;
    
  }
}
