import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { UserRole } from 'src/entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsNumber()
  @IsOptional()
  businessNumber: string;

  @IsNotEmpty()
  businessName: string;


  @IsNotEmpty()
  tradeName: string;

  @IsNotEmpty()
  businessType: string;

  @IsNotEmpty()
  country: string;
  
  @IsNotEmpty()
  city: string;

  businessWebsite: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  interestRegion: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  middleName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  gender: string;

  @IsOptional()
  birthday: Date;

  @IsOptional()
  mediaProfile: string;

}
