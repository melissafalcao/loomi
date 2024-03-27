import { UserType } from './create-user.dto';
export class UpdateUserDto {
  readonly name?: string;
  readonly email?: string;
  readonly password?: string;
  readonly type?: UserType;
}
