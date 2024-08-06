import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentHistory } from '../entities/payment-history.entity';
import { CreatePaymentHistoryDto } from './dto/create-payment-history';
import { User } from '../entities/user.entity';

@Injectable()
export class PaymentHistoryService {
  constructor(
    @InjectRepository(PaymentHistory)
    private paymentHistoryRepository: Repository<PaymentHistory>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createPaymentHistoryDto: CreatePaymentHistoryDto): Promise<PaymentHistory> {
    const { userId, ...paymentHistoryData } = createPaymentHistoryDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const paymentHistory = this.paymentHistoryRepository.create({
      ...paymentHistoryData,
      user, 
    });

    return this.paymentHistoryRepository.save(paymentHistory);
  }

  async findAll(userId: number): Promise<PaymentHistory[]> {
    return this.paymentHistoryRepository.find({
      where: { user: { id: userId } },
    });
  }

  findOne(id: number): Promise<PaymentHistory> {
    return this.paymentHistoryRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<String> {
    const payment = await this.paymentHistoryRepository.findOne({ where: {id}});

    if (!payment) {
      throw new NotFoundException(`payment history with ID ${id} not found`);
    }

    await this.paymentHistoryRepository.delete(id);

    return `payment with ID ${id} deleted successfully`;
    
  }
}
