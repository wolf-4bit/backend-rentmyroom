import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  bhk: number;

  @IsNotEmpty()
  @IsNumber()
  bathrooms: number;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  image: string;
}
