import {
	IsNotEmpty,
	IsNumber,
	IsString,
	IsDate,
	IsOptional,
	IsObject,
} from 'class-validator';
import { City } from 'src/entities/city.entity';

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

	@IsObject()
	city: City;
}
