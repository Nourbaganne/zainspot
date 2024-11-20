import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '../entities/subscription.entity';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { User } from '../entities/user.entity';
import { City } from '../entities/city.entity';
import { PaymentHistory } from 'src/entities/payment-history.entity';
import { UserService } from 'src/user/user.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Subscription, User, City, PaymentHistory]),
	],
	providers: [SubscriptionService, UserService],
	controllers: [SubscriptionController],
})
export class SubscriptionModule {}
