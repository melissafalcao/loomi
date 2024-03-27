import { IsString, IsEmail } from '@nestjs/class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
