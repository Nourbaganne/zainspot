import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Response } from 'express';
import { PaymentHistoryService } from 'src/payment-history/payment-history.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { CreateSubscriptionDto } from 'src/subscription/dto/create-subscription.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

interface CreateCheckoutSessionBodyInterface {
	stripePriceId: string;
	subscription: CreateSubscriptionDto;
	userId: number;
}

@Controller('stripe')
export class StripeController {
	constructor(
		private readonly stripeService: StripeService,
		private readonly paymentHistoryService: PaymentHistoryService,
		private readonly subscriptionService: SubscriptionService,
		private readonly userService: UserService,
	) {}

	@Post('create-checkout-session')
	async createCheckoutSession(
		@Res() res: Response,
		@Body()
		{ stripePriceId, subscription, userId }: CreateCheckoutSessionBodyInterface,
	) {
		if (!stripePriceId || !subscription || !userId) {
			return res.status(422).json({ message: 'missing required fields' });
		}

		const user = await this.userService.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const session = await this.stripeService.createCheckoutSession(
			stripePriceId,
			user.stripeCustomerId,
		);

		subscription = {
			...subscription,
			renewalDate: subscription.endDate,
			renewalStatus: 'YES',
		};

		const newSubscription =
			await this.subscriptionService.createSubscription(subscription);

		// create payment history record
		try {
			await this.paymentHistoryService.create({
				subscriptionId: newSubscription.id,
				date: new Date(),
				method: 'card',
				amount: session.amount_total,
				status: 'PENDING',
				stripeSessionId: session.id,
				userId,
			});

			res.json({ id: session.id, url: session.url });
		} catch (err) {
			console.error(err);
			return res
				.status(500)
				.json({ message: 'Error creating payment history', error: err });
		}
	}

	@Put('payment-history/:stripeSessionId')
	async updatePaymentHistoryStatus(
		@Param() { stripeSessionId }: { stripeSessionId: string },
		@Res() res: Response,
	) {
		console.log('stripe controller updatePaymentHistoryStatus has been hit');

		if (!stripeSessionId) {
			return res.status(422).json({ message: 'Stripe session ID is required' });
		}

		const session =
			await this.stripeService.stripe.checkout.sessions.retrieve(
				stripeSessionId,
			);

		if (session.payment_status.toLowerCase() != 'paid') {
			return res.status(400).json({ message: 'Payment failed' });
		}

		// update payment history
		const paymentHistory =
			await this.paymentHistoryService.findOneByStripeSessionId(
				stripeSessionId,
				['subscription'],
			);
		if (!paymentHistory) {
			return res.status(404).json({ message: 'Payment history not found' });
		}

		const updatedPaymentHistory = await this.paymentHistoryService.update(
			paymentHistory.id,
			{
				status: 'PAID',
			},
		);

		// update subscription
		const updatedSubscription = await this.subscriptionService.update(
			paymentHistory.subscription.id,
			{
				renewalDate: new Date(),
				renewalStatus: 'YES',
			},
		);

		return res.status(200).json({
			message: 'Paid successfully',
			updatedPaymentHistory,
			updatedSubscription,
		});
	}

	// view all stripe customers
	@Get('/customers')
	async getStripeCustomers(@Res() res: Response) {
		const customers = await this.stripeService.stripe.customers.list();
		return res.json(customers);
	}

	// view user payment details
	@Get('payment-methods/:userId/')
	async getUserPaymentDetails(
		@Param() { userId }: { userId: number },
		@Res() res: Response,
	) {
		const user = await User.findOne({ where: { id: userId } });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// let's get the customer first
		const customer = await this.stripeService.getCustomer(
			user.stripeCustomerId,
		);

		const paymentMethods = await this.stripeService.stripe.paymentMethods.list({
			customer: user.stripeCustomerId,
		});

		return res.json({
			customer,
			paymentMethods,
		});
	}

	// update customer
	@Put('customer-default-payment-method')
	async updateCustomer(
		@Body()
		{ customer, paymentMethod }: { customer: string; paymentMethod: string },
		@Res() res: Response,
	) {
		const updatedCustomer = await this.stripeService.stripe.customers.update(
			customer,
			{
				invoice_settings: {
					default_payment_method: paymentMethod,
				},
			},
		);

		return res.status(204).json(updatedCustomer);
	}
}
