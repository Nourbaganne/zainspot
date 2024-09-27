import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { UserService } from 'src/user/user.service';

@Module({
	controllers: [StripeController],
	providers: [StripeService, UserService],
})
export class StripeModule {}
