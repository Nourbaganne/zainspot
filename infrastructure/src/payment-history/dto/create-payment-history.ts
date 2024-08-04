import { IsNotEmpty, IsNumber, IsString, IsDate, IsObject } from 'class-validator';

export class CreatePaymentHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsObject()
  subscription: {
    country: string;
    type: string;
  };

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  method: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  status: string;
}
