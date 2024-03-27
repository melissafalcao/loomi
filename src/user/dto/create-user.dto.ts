export enum UserType {
  CLIENT = 'client',
  ADMIN = 'admin',
}

export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly type: UserType;
}
