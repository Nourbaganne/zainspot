import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateVisitorDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
