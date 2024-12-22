import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
	public stripe: Stripe;

	constructor() {
		this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
	}

	async createCheckoutSession(
		stripePricesId: string,
		stripeCustomerId: string,
	) {
		const session = await this.stripe.checkout.sessions.create({
			payment_method_types: ['card', 'paypal'],
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
			customer: stripeCustomerId,
			saved_payment_method_options: {
				payment_method_save: 'enabled',
			},
		});

		return session;
	}

	async createCustomer(name: string, email: string): Promise<string> {
		const customer = await this.stripe.customers.create({
			name,
			email,
		});

		return customer.id;
	}

	async getCustomer(stripeCustomerId: string) {
		return this.stripe.customers.retrieve(stripeCustomerId);
	}
}
