// payment-history.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentHistory } from '../entities/payment-history.entity';
import { CreatePaymentHistoryDto } from './dto/create-payment-history';
import { User } from 'src/entities/user.entity';
import { Subscription } from 'src/entities/subscription.entity';
import { UpdatePaymentHistoryDto } from './dto/update-payment-history';
import { TranslationService } from 'src/translation/translation.service';

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

		return PaymentHistory.save(paymentHistory);
	}

	async findOneByUserId(userId: number): Promise<PaymentHistory[]> {
		return PaymentHistory.find({
			where: { user: { id: userId } },
			relations: ['subscription', 'subscription.city'],
		});
	}

	async findOneByStripeSessionId(
		stripeSessionId: string,
		relations: string[] = ['subscription'],
	): Promise<PaymentHistory> {
		return PaymentHistory.findOne({
			where: { stripeSessionId },
			relations: relations,
		});
	}

	findOne(id: number): Promise<PaymentHistory> {
		return PaymentHistory.findOne({
			where: { id },
			relations: ['subscription', 'subscription.city'],
		});
	}

	findOneWithUser(id: number): Promise<PaymentHistory> {
		return PaymentHistory.findOne({
			where: { id },
			relations: ['user'],
		});
	}

	async update(
		id: number,
		updatePaymentHistoryDto: UpdatePaymentHistoryDto,
	): Promise<PaymentHistory> {
		const paymentHistory = await PaymentHistory.findOne({ where: { id } });

		if (!paymentHistory) {
			throw new NotFoundException(`Payment history with ID ${id} not found`);
		}

		Object.assign(paymentHistory, updatePaymentHistoryDto);

		return PaymentHistory.save(paymentHistory);
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
