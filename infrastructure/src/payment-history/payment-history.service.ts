import { Injectable } from '@nestjs/common';
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

    // Find user to ensure user exists
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const paymentHistory = this.paymentHistoryRepository.create({
      ...paymentHistoryData,
      user, // Associate the user
    });

    return this.paymentHistoryRepository.save(paymentHistory);
  }

  findAll(): Promise<PaymentHistory[]> {
    return this.paymentHistoryRepository.find();
  }

  findOne(id: number): Promise<PaymentHistory> {
    return this.paymentHistoryRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.paymentHistoryRepository.delete(id);
  }
}
