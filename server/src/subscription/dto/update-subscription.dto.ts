import { IsDate, IsString } from 'class-validator';

export class updateSubscriptionDto {
	@IsDate()
	startDate?: Date;

	@IsDate()
	endDate?: Date;

	@IsDate()
	renewalDate?: Date;

	@IsString()
	renewalStatus?: string;
}
