import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/entities/role.entity';

export class AuthLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  role: Role[];
}
