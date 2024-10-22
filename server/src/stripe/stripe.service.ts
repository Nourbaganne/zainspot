import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
	public stripe: Stripe;

	constructor() {
		this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
	}

	async createCheckoutSession(stripePricesId: string) {
		const session = await this.stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price: stripePricesId,
					quantity: 1,
				},
			],
			mode: 'subscription',
			success_url:
				process.env.CLIENT_URL +
				'/checkout/success?session_id={CHECKOUT_SESSION_ID}',
			cancel_url:
				process.env.CLIENT_URL +
				'/checkout/cancel?session_id={CHECKOUT_SESSION_ID}',
		});

		return session;
	}
}
