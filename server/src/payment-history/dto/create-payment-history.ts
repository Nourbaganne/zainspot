import {
	IsNotEmpty,
	IsNumber,
	IsString,
	IsDate,
	IsObject,
	IsOptional,
} from 'class-validator';
import { Subscription } from 'src/entities/subscription.entity';

export class CreatePaymentHistoryDto {
	@IsNotEmpty()
	@IsNumber()
	userId: number;

	@IsNotEmpty()
	@IsObject()
	subscription: Subscription;

	@IsNotEmpty()
	@IsDate()
	date: Date;

	@IsOptional()
	@IsString()
	method: string;

	@IsNotEmpty()
	@IsNumber()
	amount: number;

	@IsNotEmpty()
	@IsString()
	status: string;

	@IsOptional()
	@IsString()
	stripeSessionId: string;
}
