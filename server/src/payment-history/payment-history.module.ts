import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentHistoryService } from './payment-history.service';
import { PaymentHistoryController } from './payment-history.controller';
import { PaymentHistory } from '../entities/payment-history.entity';
import { User } from '../entities/user.entity';
import { Subscription } from 'src/entities/subscription.entity';

@Module({
	imports: [TypeOrmModule.forFeature([PaymentHistory, User, Subscription])],
	providers: [PaymentHistoryService],
	controllers: [PaymentHistoryController],
	exports: [PaymentHistoryService],
})
export class PaymentHistoryModule {}
