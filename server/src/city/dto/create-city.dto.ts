import {
	IsNotEmpty,
	IsNumber,
	IsString,
	IsOptional,
	IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import PerMonth from 'src/interfaces/PerMonth';

export class CreateCityDto {
	@IsNotEmpty()
	city: string;

	@IsNotEmpty()
	country: string;

	@IsNotEmpty()
	@IsBoolean()
	@Type(() => Boolean)
	hidden: boolean;

	@IsNotEmpty()
	location: { title: string; locationLink: string };

	@IsOptional()
	description: string;

	@IsOptional()
	catchphrase: string;

	@IsNotEmpty()
	@IsNumber()
	goldPrice: PerMonth;

	@IsOptional()
	classicPrice: {
		perMonth: PerMonth[];
	};

	@IsOptional()
	@IsString()
	imageUrl?: string;
}
