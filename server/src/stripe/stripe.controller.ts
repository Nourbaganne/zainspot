import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Response } from 'express';
import { PaymentHistoryService } from 'src/payment-history/payment-history.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { CreateSubscriptionDto } from 'src/subscription/dto/create-subscription.dto';

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
    @Body() { stripePriceId, subscription, userId }: CreateCheckoutSessionBodyInterface,
) {
    if (!stripePriceId || !subscription || !userId) {
        return res
            .status(422)
            .json({ message: 'StripePriceIds and Subscriptions are required' });
    }

    try {
        subscription = {
            ...subscription,
            renewalDate: subscription.endDate,
            renewalStatus: 'YES',
        };

        const newSubscription = await this.subscriptionService.createSubscription(subscription);
        console.log('stripe controller newSubscription', newSubscription);

        const session = await this.stripeService.createCheckoutSession(stripePriceId);

        // Create payment history record
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

        return res.json({ id: session.id, url: session.url });
    } catch (error) {
        console.error('Error in createCheckoutSession:', error);
        return res.status(500).json({ message: 'An error occurred during the checkout session creation' });
    }
}




}
