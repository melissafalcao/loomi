import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDecimal,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsNumber()
  @Min(0)
  quantity: number;
}
