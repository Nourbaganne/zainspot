import { IsNotEmpty, IsNumber, IsArray } from "class-validator";

export class CreateCityDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  goldPrice: number;

  @IsNotEmpty()
  @IsArray()
  pricing: {
    duration: string;
    amount: number;
  }[];
}