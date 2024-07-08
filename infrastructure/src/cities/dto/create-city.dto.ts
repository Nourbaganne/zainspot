import { IsNotEmpty, IsNumber, IsArray, IsString, IsOptional } from "class-validator";

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
  classicPrice: {
    duration: string;
    amount: number;
  }[];

  @IsOptional()
  @IsString()
  imageUrl?: string;
}