import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { NumericType } from 'typeorm';

interface PerMonth {
  duration: number;
  amount: number;
}

export class CreateCityDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  disponibility: boolean;

  @IsNotEmpty()
  location: { title: string; posx: NumericType; posy: NumericType };

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  goldPrice: number;

  @IsOptional()
  classicPrice: {
    perYear: number;
    perMonth: PerMonth[];
  };

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
