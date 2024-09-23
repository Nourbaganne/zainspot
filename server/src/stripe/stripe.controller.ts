import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';

@Controller('stripe')
export class StripeController {
	constructor(
		private readonly stripeService: StripeService,
		private readonly userService: UserService,
	) {}

	@Post('create-checkout-session')
	async createCheckoutSession(
		@Res() res: Response,
		@Req() req: Request,
		@Body() body: { priceId: string },
	) {
		const session = await this.stripeService.createCheckoutSession(
			body.priceId,
		);

		console.log('req[user]', req['user']);

		res.json({ id: session.id, url: session.url });
	}
}
