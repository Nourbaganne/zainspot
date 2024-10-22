import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Response } from 'express';
import { PaymentHistoryService } from 'src/payment-history/payment-history.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { CreateSubscriptionDto } from 'src/subscription/dto/create-subscription.dto';
import { Public } from 'src/decorators/public.decorator';

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
	) { }

	@Post('create-checkout-session')
	async createCheckoutSession(
		@Res() res: Response,
		@Body()
		{ stripePriceId, subscription, userId }: CreateCheckoutSessionBodyInterface,
	) {
		if (!stripePriceId || !subscription || !userId) {
			return res
				.status(422)
				.json({ message: 'StripePriceIds and Subscriptions are required' });
		}

		const session =
			await this.stripeService.createCheckoutSession(stripePriceId);

		subscription = {
			...subscription,
			renewalDate: subscription.endDate,
			renewalStatus: 'YES',
		};

		const newSubscription =
			await this.subscriptionService.createSubscription(subscription);
		console.log('stripe controller newSubscription', newSubscription);

		// create payment history record
		try {
			const newPaymentHistory = await this.paymentHistoryService.create({
				subscriptionId: newSubscription.id,
				date: new Date(),
				method: 'card',
				amount: session.amount_total,
				status: 'PENDING',
				stripeSessionId: session.id,
				userId,
			});
			console.log('stripe controller newPaymentHistory', newPaymentHistory);

		res.json({ id: session.id, url: session.url });
	}

	@Public()
	@Get('payment-intents/:userId')
	async getPaymentIntents(@Param('userId') userId: number) {
		return await this.stripeService.getPaymentIntentsByUserId(userId);
	}


}
