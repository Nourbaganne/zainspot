import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	email: string;

	@IsBoolean()
	@IsOptional()
	isEmailConfirmed?: boolean;

	@IsNotEmpty()
	password: string;

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

	@IsNotEmpty()
	zipCode: string;

	@IsNotEmpty()
	fullStreetAdress: string;

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

	roleId: number;

	@IsOptional()
	@IsString()
	imageUrl: string;

	@IsNotEmpty()
	@IsString()
	recaptcha: string;
}
