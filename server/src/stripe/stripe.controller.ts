import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Response } from 'express';
import { Subscription } from 'src/entities/subscription.entity';
import { PaymentHistoryService } from 'src/payment-history/payment-history.service';
import { SubscriptionService } from 'src/subscription/subscription.service';

interface CreateCheckoutSessionBodyInterface {
	stripePriceIds: string[];
	subscriptions: Subscription[];
	userId: number;
}

@Controller('stripe')
export class StripeController {
	constructor(
		private readonly stripeService: StripeService,
		private readonly paymentHistoryService: PaymentHistoryService,
		private readonly subscriptionService: SubscriptionService,
	) {}

	@Post('create-checkout-session')
	async createCheckoutSession(
		@Res() res: Response,
		@Req() req: Request,
		@Body()
		{
			stripePriceIds,
			subscriptions,
			userId,
		}: CreateCheckoutSessionBodyInterface,
	) {
		if (stripePriceIds?.length > 0 && subscriptions?.length > 0) {
			const session =
				await this.stripeService.createCheckoutSession(stripePriceIds);

			// create payment history record
			const newPayment = await this.paymentHistoryService.create({
				subscriptions: subscriptions,
				date: new Date(),
				method: null,
				amount: session.amount_total,
				status: 'PENDING',
				stripeSessionId: session.id,
				userId,
			});

			subscriptions = subscriptions.map((subscription: any) => {
				return {
					...subscription,
					renewalData: subscription.endDate,
					renewalStatus: 'YES',
					paymentId: newPayment.id,
				};
			});

			this.subscriptionService.createMany(subscriptions);

			res.json({ id: session.id, url: session.url });
		} else {
			res
				.status(422)
				.json({ message: 'StripePriceIds and Subscriptions are required' });
		}
	}
}
