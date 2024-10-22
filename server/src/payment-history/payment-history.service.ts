// payment-history.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentHistory } from '../entities/payment-history.entity';
import { CreatePaymentHistoryDto } from './dto/create-payment-history';
import { User } from 'src/entities/user.entity';

@Injectable()
export class PaymentHistoryService {
	constructor() {}

	async create(
		createPaymentHistoryDto: CreatePaymentHistoryDto,
	): Promise<PaymentHistory> {
		const { userId, ...paymentHistoryData } = createPaymentHistoryDto;

		const user = await User.findOneBy({ id: userId });
		if (!user) {
			throw new Error('User not found');
		}

		const paymentHistory = PaymentHistory.create({
			...paymentHistoryData,
			user,
		});

		return PaymentHistory.save(paymentHistory);
	}

	async findOneByUserId(userId: number): Promise<PaymentHistory[]> {
		return PaymentHistory.find({
			where: { user: { id: userId } },
			relations: ['subscriptions', 'subscriptions.city'],
		});
	}

	findOne(id: number): Promise<PaymentHistory> {
		return PaymentHistory.findOne({
			where: { id },
			relations: ['subscriptions', 'subscriptions.city'], 
		});
	}

	async remove(id: number): Promise<string> {
		const payment = await PaymentHistory.findOne({ where: { id } });

		if (!payment) {
			throw new NotFoundException(`Payment history with ID ${id} not found`);
		}

		await PaymentHistory.delete(id);

		return `Payment with ID ${id} deleted successfully`;
	}
}
