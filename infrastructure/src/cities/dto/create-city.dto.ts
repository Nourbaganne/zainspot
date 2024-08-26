import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

interface PerMonth {
  duration: number;
  amount: number;
  tax: number;
}

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

  @IsNotEmpty()
  @IsNumber()
  goldPrice: { value: number; tax: number };

  @IsOptional()
  classicPrice: {
    perMonth: PerMonth[];
  };

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
