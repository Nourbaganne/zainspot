import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  disponibility: boolean;

  @IsNotEmpty()
  location: { title: string; posx: number; posy: number };

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  goldPrice: number;

  @IsNotEmpty()
  @IsArray()
  classicPrice: {
    duration: string;
    amount: number;
  }[];

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
