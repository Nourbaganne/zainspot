// payment-history.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentHistory } from '../entities/payment-history.entity';
import { CreatePaymentHistoryDto } from './dto/create-payment-history';
import { User } from 'src/entities/user.entity';
import { Subscription } from 'src/entities/subscription.entity';

@Injectable()
export class PaymentHistoryService {
	constructor() {}

	async create(
		createPaymentHistoryDto: CreatePaymentHistoryDto,
	): Promise<PaymentHistory> {
		const { userId, subscriptionId, ...paymentHistoryData } =
			createPaymentHistoryDto;

		const user = await User.findOneBy({ id: userId });
		if (!user) {
			throw new Error('User not found');
		}

		const subscription = await Subscription.findOneBy({ id: subscriptionId });
		if (!subscription) {
			throw new Error('Subscription not found');
		}

		const paymentHistory = PaymentHistory.create({
			...paymentHistoryData,
		});

		paymentHistory.user = user;
		paymentHistory.subscription = subscription;

		console.log('payment history service create method -----------------');
		console.log('user', user);
		console.log('subscription', subscription);
		console.log('paymentHistory', paymentHistory);

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
