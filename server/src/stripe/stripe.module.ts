import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { PaymentHistoryService } from '../payment-history/payment-history.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { Subscription } from '../entities/subscription.entity';
import { User } from '../entities/user.entity';
import { City } from '../entities/city.entity';
import { PaymentHistory } from '../entities/payment-history.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Subscription, User, City, PaymentHistory]),
	],
	controllers: [StripeController],
	providers: [StripeService, PaymentHistoryService, SubscriptionService],
})
export class StripeModule {}
