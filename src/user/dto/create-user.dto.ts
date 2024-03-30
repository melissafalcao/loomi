import { IsString } from 'class-validator';
export enum UserType {
  CLIENT = 'client',
  ADMIN = 'admin',
}

export class CreateUserDto {
  @IsString()
  name: string;
  email: string;
  password: string;
  type: UserType;
  createdAt: Date;
}
