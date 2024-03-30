import { IsString, IsNumber } from 'class-validator';

export class CreateClientDto {
  @IsNumber()
  userId: number;
  @IsString()
  fullName: string;
  @IsString()
  phone: string;
  @IsString()
  address: string;
  status: boolean;
  createdAt: Date;
}
