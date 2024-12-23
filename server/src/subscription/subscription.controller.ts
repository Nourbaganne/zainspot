import {
	Controller,
	Post,
	Get,
	Param,
	Body,
	Delete,
	ParseIntPipe,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionResponseDto } from './dto/subscription-response.dto';
import { Subscription } from '../entities/subscription.entity';
import { Public } from 'src/decorators/public.decorator';

@Controller('subscriptions')
export class SubscriptionController {
	constructor(private readonly subscriptionService: SubscriptionService) {}

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
	@Get('/revenue')
	async getRevenue() {
		return this.subscriptionService.getRevenue();
	}

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
}
