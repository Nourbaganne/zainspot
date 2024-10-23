import {
	IsNotEmpty,
	IsNumber,
	IsString,
	IsDate,
	IsOptional,
} from 'class-validator';

export class CreatePaymentHistoryDto {
	@IsNotEmpty()
	@IsNumber()
	userId: number;

	@IsNotEmpty()
	@IsNumber()
	subscriptionId: number;

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
