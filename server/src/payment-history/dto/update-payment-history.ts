import { IsString } from 'class-validator';

export class UpdatePaymentHistoryDto {
	@IsString()
	status: string;
}
