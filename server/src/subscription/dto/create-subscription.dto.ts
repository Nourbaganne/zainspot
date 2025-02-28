import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubscriptionDto {
	@IsNotEmpty()
	@IsNumber()
	userId: number;

	@IsNotEmpty()
	@IsNumber()
	cityId: number;

	@IsNotEmpty()
	@IsString()
	optionType: string;

	@IsNotEmpty()
	@IsNumber()
	duration: number;

	@IsNotEmpty()
	@IsNumber()
	price: number;

	@IsNotEmpty()
	startDate: Date;

	@IsNotEmpty()
	endDate: Date;

	@IsOptional()
	renewalDate: Date;

	@IsOptional()
	renewalStatus: string;

	@IsOptional()
	paymentHistoryId: number;
}
