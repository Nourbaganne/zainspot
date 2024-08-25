import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateInvoicesDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsDate()
  dateIssued: Date;
  
  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  status: string;
}
