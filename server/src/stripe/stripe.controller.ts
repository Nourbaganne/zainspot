import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Response } from 'express';
import { PaymentHistoryService } from 'src/payment-history/payment-history.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { CreateSubscriptionDto } from 'src/subscription/dto/create-subscription.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Public } from 'src/decorators/public.decorator';

interface CreateCheckoutSessionBodyInterface {
	stripePriceIds: string[];
	subscriptions: CreateSubscriptionDto[];
	userId: number;
}

@Controller('stripe')
export class StripeController {
	constructor(
		private readonly stripeService: StripeService,
		private readonly paymentHistoryService: PaymentHistoryService,
		private readonly subscriptionService: SubscriptionService,
		private readonly userService: UserService,
	) { }

	@Public()
	@Post('create-checkout-session')
	async createCheckoutSession(
		@Res() res: Response,
		@Body()
		{ stripePriceIds, subscriptions, userId }: CreateCheckoutSessionBodyInterface,
	) {
		if (!stripePriceIds || !subscriptions || !userId || stripePriceIds.length === 0) {
			return res.status(422).json({ message: 'Missing required fields' });
		}

		const user = await this.userService.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Ensure all subscriptions have the same duration
		const uniqueDurations = new Set(subscriptions.map(sub => sub.duration));
		if (uniqueDurations.size > 1) {
			return res.status(400).json({ message: 'All subscriptions must have the same duration' });
		}

		// Create Stripe Checkout session for multiple subscriptions
		const session = await this.stripeService.createCheckoutSession(
			stripePriceIds,
			user.stripeCustomerId
		);

		try {
			// Save each subscription in DB
			const newSubscriptions = await Promise.all(
				subscriptions.map(async (subscription) => {
					return await this.subscriptionService.createSubscription({
						...subscription,
						renewalDate: subscription.endDate,
						renewalStatus: 'YES',
					});
				})
			);

			// Create payment history records for each subscription
			await Promise.all(
				newSubscriptions.map(async (newSubscription, index) => {
					return await this.paymentHistoryService.create({
						subscriptionId: newSubscription.id,
						date: new Date(),
						method: 'card',
						amount: session.amount_total / newSubscriptions.length, // Divide total amount
						status: 'FAILED',
						stripeSessionId: session.id,
						userId,
					});
				})
			);

			res.json({ id: session.id, url: session.url });
		} catch (err) {
			console.error(err);
			return res.status(500).json({ message: 'Error creating payment history', error: err });
		}
	}


	@Public()
	@Put('payment-history/:stripeSessionId')
	async updatePaymentHistoryStatus(
		@Param() { stripeSessionId }: { stripeSessionId: string },
		@Res() res: Response,
	) {
		if (!stripeSessionId) {
			return res.status(422).json({ message: 'Stripe session ID is required' });
		}

		// check session payment status after checkout
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
				['subscription', 'subscription.city'],
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
				renewalStatus: 'NO',
				// maybe rename it to autoRenewal and save boolean value in it for better storage efficiency
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

	@Public()
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

		// in case this is old user and the stripeCustomerId was not assigned after signup, create stripeCustomerId for user now
		if (user.stripeCustomerId === null) {
			const stripeCustomerId = await this.stripeService.createCustomer(
				user.businessName,
				user.email,
			);

			user.stripeCustomerId = stripeCustomerId;
			await user.save();
		}

		// let's get the customer first
		const customer = await this.stripeService.getCustomer(
			user.stripeCustomerId,
		);

		const paymentMethods = await this.stripeService.stripe.paymentMethods.list({
			customer: user.stripeCustomerId,
		});

		const responseData = {
			customer,
			paymentMethods,
		};

		return res.json(responseData);
	}

	// update customer default payment method
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
