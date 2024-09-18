import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
	private stripe: Stripe;

	constructor() {
		this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
	}

	async createCheckoutSession() {
		const session = await this.stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price: 'price_1Hh1YZ2eZvKYlo2C0g9XzG7e', // Replace with your price ID
					quantity: 1,
				},
			],
			mode: 'subscription',
			success_url: process.env.CLIENT_URL + '/cart/checkout/success',
			cancel_url: process.env.CLIENT_URL + '/cart/checkout/cancel',
		});

		return session;
	}
}
