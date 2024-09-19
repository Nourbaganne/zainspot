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

	@IsOptional()
	renewalDate: Date;

	@IsOptional()
	renewalStatus: string;
}
