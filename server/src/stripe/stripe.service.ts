import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
	private stripe: Stripe;

	constructor(private userService: UserService) {
		this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
	}

	async createCheckoutSession(priceId: string) {
		const session = await this.stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price: priceId, // Replace with your price ID
					quantity: 1,
				},
			],
			mode: 'subscription',
			success_url: process.env.CLIENT_URL + '/cart/checkout/success',
			cancel_url: process.env.CLIENT_URL + '/cart/checkout/cancel',
		});

		// TODO: use userService instead of this.userRepository
		// update user.lastStripeSessionId
		// const user = await this.userRepository.findOne({ where: { id: null } });
		// user.lastStripeSessionId = session.id;
		// await this.userRepository.save(user);

		return session;
	}
}
