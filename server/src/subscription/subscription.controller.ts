import {
	Controller,
	Post,
	Get,
	Param,
	Body,
	Delete,
	ParseIntPipe,
	Query,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionResponseDto } from './dto/subscription-response.dto';
import { Subscription } from '../entities/subscription.entity';
import { Public } from 'src/decorators/public.decorator';
import { PaymentHistoryService } from 'src/payment-history/payment-history.service';

@Controller('subscriptions')
export class SubscriptionController {
	constructor(
		private readonly subscriptionService: SubscriptionService,
		private readonly paymentHistoryService: PaymentHistoryService,
	) {}

	@Public()
	@Get()
	async findAll(@Query() query: Record<string, any>): Promise<any> {
		return this.subscriptionService.findAll(query);
	}

	@Public()
	@Get('/revenue')
	async getRevenue() {
		return this.subscriptionService.getRevenue();
	}

	@Public()
	@Get('/:userId')
	async findByUserId(@Param('userId', ParseIntPipe) userId: number) {
		return this.subscriptionService.findByUserId(userId);
	}

	@Post()
	async createSubscription(
		@Body() createSubscriptionDto: CreateSubscriptionDto,
	): Promise<Subscription> {
		return this.subscriptionService.createSubscription(createSubscriptionDto);
	}

	@Public()
	@Get(':userId')
	async getSubscriptionsByUser(
		@Param('userId', ParseIntPipe) userId: number,
	): Promise<SubscriptionResponseDto[]> {
		return this.subscriptionService.getSubscriptionsByUser(userId);
	}

	@Delete('remove/:id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return this.subscriptionService.remove(id);
	}

	@Delete(':sessionId')
	async deleteSubscription(@Param('sessionId') sessionId: string) {
		const paymentHistory =
			await this.paymentHistoryService.findOneByStripeSessionId(sessionId);

		const subscriptionId = paymentHistory.subscription.id;

		paymentHistory.subscription = null;
		await paymentHistory.save();

		console.log('deleting subscription with id', subscriptionId);

		return this.subscriptionService.remove(subscriptionId);
	}
}
